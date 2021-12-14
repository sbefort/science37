import styled from 'styled-components';
import Tweet from './Tweet';
import Button from './Button';
import filterTweets from '../utils/filterTweets';

const Tweets = ({ tweets, selectedHashtag, onHashtagClick, onLoadMoreClick, hasMoreResults }) => {
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

  const loadMore = () => {
    if (hasMoreResults) {
      return (
        <LoadMore>
          <Button onClick={onLoadMoreClick}>Load more</Button>
        </LoadMore>
      )
    }
    return null;
  }

  return (
    <>
      {filterTweets(tweets, selectedHashtag).map((tweet, i) => (
        <Tweet isEven={i % 2 === 0} key={tweet.id} tweet={tweet} selectedHashtag={selectedHashtag} onHashtagClick={onHashtagClick} />
      ))}

      { loadMore() }
    </>
  );
};

const P = styled.p`
	text-align: center;
  font-size: 1.5em;
  padding: 50px 0;
`;

const LoadMore = styled.div`
	text-align: center;
  padding: 40px 0;
`;

export default Tweets;
