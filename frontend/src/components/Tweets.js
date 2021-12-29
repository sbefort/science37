import { useContext } from 'react';
import styled from 'styled-components';
import Tweet from './Tweet';
import Button from './stateless/Button';
import Spinner from './stateless/Spinner';
import { ACTIONS, TwitterContext } from '../context/twitterContext';
import twitterProxy from '../services/twitterProxy';

const Tweets = () => {
  const [state, dispatch] = useContext(TwitterContext);

  const setIsLoading = (bool) => dispatch({ type: ACTIONS.SET_IS_LOADING, payload: bool });
  const setTweets = (data) => dispatch({ type: ACTIONS.SET_TWEETS, payload: data });
  const filterTweets = () => dispatch({ type: ACTIONS.FILTER_TWEETS });
  const setNextResults = (data) => dispatch({ type: ACTIONS.SET_NEXT_RESULTS, payload: data });

  const onLoadMoreClick = async () => {
    try {
      setIsLoading(true);
      const response = await twitterProxy.getNextResults(state.nextResults);
      setTweets(response.data.tweets);
      filterTweets();
      setNextResults(response.data.nextResults);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const renderLoadMore = () => {
    if (state.nextResults && !state.isLoading) {
      return (
        <CenterWithPadding>
          <Button onClick={onLoadMoreClick}>Load more</Button>
        </CenterWithPadding>
      );
    }
    return null;
  };

  if (!state.isLoading && !state.tweets) {
    return (
      <P>Try searching to find some tweets!</P>
    );
  }

  if (!state.isLoading && state.tweets.length === 0) {
    return (
      <P>Darn, no results found for that search query.</P>
    );
  }

  return (
    <>
      {state.filteredTweets && state.filteredTweets.map((tweet, i) => (
        <Tweet isEven={i % 2 === 0} key={tweet.id} tweet={tweet} />
      ))}
      {state.isLoading && <CenterWithPadding><Spinner /></CenterWithPadding>}
      { renderLoadMore() }
    </>
  );
};

const P = styled.p`
  text-align: center;
  font-size: 1.5rem;
  padding: 50px 0;
`;

const CenterWithPadding = styled.div`
  text-align: center;
  padding: 40px 0;
`;

export default Tweets;
