import styled from 'styled-components';
import Tweet from './Tweet';
import filterTweets from '../utils/filterTweets';

const Tweets = ({ tweets, selectedHashtag, onHashtagClick }) => {
  if (!tweets) {
    return (
      <P>Try searching to find some tweets!</P>
    );
  }

  if (tweets.length === 0) {
    return (
      <P>Darn, no results found for that search query.</P>
    );
  }

  return (
    <>
      {filterTweets(tweets, selectedHashtag).map((tweet, i) => (
        <Tweet isEven={i % 2 === 0} key={tweet.id} tweet={tweet} selectedHashtag={selectedHashtag} onHashtagClick={onHashtagClick} />
      ))}
    </>
  );
};

const P = styled.p`
	text-align: center;
  font-size: 1.5em;
  padding: 50px 0;
`;

export default Tweets;
