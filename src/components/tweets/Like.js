import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'bloomer';
import { FirebaseContext } from '../Firebase';

const Like = ({ tid }) => {
  const { firebase } = useContext(FirebaseContext);
  const [lid, setLid] = useState('');
  const [likesNumber, setNumber] = useState('');
  const onLike = () => {
    const user = JSON.parse(window.localStorage.getItem('user'));
    user && 'uid' in user && firebase.postLike(tid, user.uid);
  };
  const onDislike = () => {
    firebase.like(lid).remove();
  };
  const getLikes = () =>
    firebase.getLikes(tid).on('value', snapshot => {
      const likes = snapshot.val();
      const { uid } = JSON.parse(window.localStorage.getItem('user'));
      likes ? setNumber(Object.keys(likes).length) : setNumber('');
      setLid('');
      for (let like in likes) {
        if (likes[like].uid === uid) {
          setLid(like);
        }
      }
    });

  useEffect(() => {
    firebase.likes().on('child_removed', () => getLikes());
    getLikes();
  }, []);

  return (
    <Button onClick={!lid ? onLike : onDislike}>
      {!lid ? `${likesNumber} Like` : `${likesNumber} Dislike`}
    </Button>
  );
};

export default Like;
