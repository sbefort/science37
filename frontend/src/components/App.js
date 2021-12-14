import { useState, useEffect } from 'react';
import { GlobalStyles } from '../styles/global';
import { IoSearchSharp } from "react-icons/io5";
import MasonryItem from './MasonryItem';
import H1 from './H1';
import H2 from './H2';
import TextInputWithIcon from './TextInputWithIcon';
import Card from './Card';
import Chip from './Chip';
import Footer from './Footer';
import useDebounce from '../hooks/useDebounce';
import useTwitterProxy from '../hooks/useTwitterProxy';
import twitterProxy from '../services/twitterProxy';
import Tweets from './Tweets';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 250);
  const [hashtags, setHashtags] = useState([]);
  const [selectedHashtag, setSelectedHashtag] = useState('');
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // When the debounced search term changes, update the
  // query string to be sent to the backend proxy.
  const [data, setData] = useTwitterProxy(debouncedSearchTerm);

  useEffect(() => {
    // Map through all search results and return all unique hashtags
    const hashtags = data.statuses ? data.statuses.map((status) => status.entities.hashtags).flat()
                                                  .map((hashtag) => hashtag.text)
                                                  .filter((value, index, self) => self.indexOf(value) === index) : [];
    setHashtags(hashtags);
    setSelectedHashtag('');
    setIsLoadingMore(false);
  }, [data]);

  // Add or remove hashtags from the selectedHashtags filter when a hashtag is clicked
  const onHashtagClick = (hashtag) => {
    // If the hashtag is already selected, reset the filter
    if (hashtag === selectedHashtag) {
      setSelectedHashtag('');
      return;
    }

    // If the hashtag was not already selected, and the hashtag was clicked, add it to the array
    setSelectedHashtag(hashtag);
  };

  const onLoadMoreClick = async() => {
    setIsLoadingMore(true);
    const response = await twitterProxy.getNextResults(data.search_metadata.next_results);
    const { search_metadata, statuses } = response.data;
    setData((currentState) => ({
      search_metadata,
      statuses: currentState.statuses.concat(statuses)
    }));
    setIsLoadingMore(false);
  }

  return (
    <>
      <GlobalStyles />
      <header>
        <H1>Tweet Feed</H1>
        <MasonryItem width="67%">
          <TextInputWithIcon
            onChange={(e) => { setSearchTerm(e.target.value); }}
            placeholder="Search by keyword"
            value={searchTerm}
            iconComponent={<IoSearchSharp color="#ccc" fontSize="1.5em" />}
          />
        </MasonryItem>
      </header>
      <MasonryItem width="30%" floatDirection="right">
        <Card>
          <H2>Filter by hashtag</H2>
          {hashtags.map((hashtag, i) => (
            <Chip isSelected={selectedHashtag === hashtag} onClick={() => onHashtagClick(hashtag)} key={i}>#{ hashtag }</Chip>
          ))}
          {hashtags.length === 0 && <p>No hashtags found, maybe try another search term?</p>}
        </Card>
      </MasonryItem>
      <MasonryItem width="67%">
        <Card styles={{padding: '0'}}>
          <Tweets
            tweets={data.statuses}
            selectedHashtag={selectedHashtag}
            onHashtagClick={onHashtagClick}
            onLoadMoreClick={onLoadMoreClick}
            hasMoreResults={data.search_metadata && data.search_metadata.has_more_results}
            isLoadingMore={isLoadingMore}
          />
        </Card>
      </MasonryItem>
      <Footer />
    </>
  );
}

export default App;
