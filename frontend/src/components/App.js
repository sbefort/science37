import { useState, useEffect, useContext } from 'react';
import { IoSearchSharp } from 'react-icons/io5';
import GlobalStyles from '../styles/global';
import MasonryItem from './MasonryItem';
import H1 from './stateless/H1';
import H2 from './stateless/H2';
import TextInputWithIcon from './stateless/TextInputWithIcon';
import Card from './stateless/Card';
import Chips from './stateless/Chips';
import Chip from './stateless/Chip';
import Footer from './stateless/Footer';
import useDebouncedEffect from '../hooks/useDebouncedEffect';
import twitterProxy from '../services/twitterProxy';
import Tweets from './Tweets';
import { ACTIONS, TwitterContext } from '../context/twitterContext';

const App = () => {
  const [state, dispatch] = useContext(TwitterContext);
  const [searchTerm, setSearchTerm] = useState('');

  const onSearchTermChange = (e) => {
    dispatch({ type: ACTIONS.RESET_STATE });
    dispatch({ type: ACTIONS.SET_IS_LOADING, payload: true });
    setSearchTerm(e.target.value);
  };
  const setIsLoading = (bool) => dispatch({ type: ACTIONS.SET_IS_LOADING, payload: bool });
  const setTweets = (data) => dispatch({ type: ACTIONS.SET_TWEETS, payload: data });
  const setNextResults = (data) => dispatch({ type: ACTIONS.SET_NEXT_RESULTS, payload: data });
  const setUniqueHashtags = () => dispatch({ type: ACTIONS.SET_UNIQUE_HASHTAGS });
  const setSelectedHashtags = (hashtag) => dispatch({ type: ACTIONS.SET_SELECTED_HASHTAGS, payload: hashtag });
  const filterTweets = () => dispatch({ type: ACTIONS.FILTER_TWEETS });
  const resetState = () => dispatch({ type: ACTIONS.RESET_STATE });

  // Debounced call to backend proxy when search term changes
  useDebouncedEffect(async () => {
    if (!searchTerm) return;

    try {
      setIsLoading(true);
      const response = await twitterProxy.search(searchTerm);
      // In the case of multiple async requests happening concurrently,
      // make sure the current client search term matches the search term in the response
      // before updating the search results with stale data.
      if (response.data.searchTerm === searchTerm) {
        setTweets(response.data.tweets);
        setNextResults(response.data.nextResults);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm], 250);

  // Always reset state when search term is empty (no debounce)
  useEffect(() => {
    if (!searchTerm) {
      resetState();
    }
  }, [searchTerm]);

  // Update the unique list of hashtags whenever the list of tweets changes
  useEffect(() => {
    setUniqueHashtags();
  }, [state.tweets]);

  // Update tweet filter whenever a user toggles a hashtag
  useEffect(() => {
    filterTweets();
  }, [state.selectedHashtags]);

  return (
    <>
      <GlobalStyles />
      <header>
        <H1>Tweet Feed</H1>
        <MasonryItem width="67%">
          <TextInputWithIcon
            onChange={onSearchTermChange}
            placeholder="Search by keyword"
            value={state.searchTerm}
            iconComponent={<IoSearchSharp color="#ccc" fontSize="1.5em" />}
          />
        </MasonryItem>
      </header>
      <MasonryItem width="30%" floatDirection="right">
        <Card>
          <H2>Filter by hashtag</H2>
          <Chips>
            {state.uniqueHashtags.map((hashtag) => (
              <Chip role="button" key={hashtag} isSelected={state.selectedHashtags.includes(hashtag)} onClick={() => setSelectedHashtags(hashtag)}>
                #
                { hashtag }
              </Chip>
            ))}
          </Chips>
          {state.uniqueHashtags.length === 0 && <p>No hashtags found, maybe try another search term?</p>}
        </Card>
      </MasonryItem>
      <MasonryItem width="67%">
        <Card styles={{ padding: 0 }}>
          <Tweets />
        </Card>
      </MasonryItem>
      <Footer />
    </>
  );
};

export default App;
