import React from 'react';
import Tweets from '../components/tweets';
import NewTweet from '../components/tweets/New';

const Home = ({ history }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) history.push('/signIn');
  return (
    <>
      <NewTweet />
      <Tweets />
    </>
  );
};

export default Home;
