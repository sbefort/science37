import { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../styles/theme';
import { GlobalStyles } from '../styles/global';
import { IoSearchSharp } from "react-icons/io5";
import MasonryItem from './MasonryItem';
import H1 from './H1';
import H2 from './H2';
import TextInputWithIcon from './TextInputWithIcon';
import Card from './Card';
import Tweet from './Tweet';
import Footer from './Footer';
import useDebounce from '../hooks/useDebounce';
import useTwitterProxy from '../hooks/useTwitterProxy';

// If page is loaded with '?theme=dark' appended to URL, change to dark mode.
const params = new URLSearchParams(window.location.search);
const theme = params.get('theme') === 'dark' ? darkTheme : lightTheme;

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [searchQuery, setSearchQuery] = useState('');

  // When the debounced search term changes, update the
  // query string to be sent to the backend proxy.
  // This search query is different when the "Load More"
  // button is clicked. In that case, max_id will be used.
  useEffect(() => {
    setSearchQuery(`q=${encodeURIComponent(debouncedSearchTerm)}&result_type=popular&count=5`);
  }, [debouncedSearchTerm]);

  const data = useTwitterProxy(searchQuery);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <header>
        <H1>Tweet Feed</H1>
        <MasonryItem width="70%">
          <TextInputWithIcon
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by keyword"
            value={searchTerm}
            iconComponent={<IoSearchSharp color="#ccc" fontSize="1.5em" />}
          />
        </MasonryItem>
      </header>
      <MasonryItem width="27%" floatDirection="right">
        <Card>
          <H2>Filter by hashtag</H2>
          <p>Is my font size getting smaller?</p>
        </Card>
      </MasonryItem>
      <MasonryItem width="70%">
        <Card>
          {data.statuses && data.statuses.map((tweet) => (
            <Tweet key={tweet.id} tweet={tweet} />
          ))}
        </Card>
      </MasonryItem>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
