import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../styles/theme';
import { GlobalStyles } from '../styles/global';
import { IoSearchSharp } from "react-icons/io5";
import MasonryItem from './MasonryItem';
import H1 from './H1';
import H2 from './H2';
import TextInputWithIcon from './TextInputWithIcon';
import Card from './Card';
import useTwitterProxy from '../hooks/useTwitterProxy';

const params = new URLSearchParams(window.location.search);
const theme = params.get('theme') === 'dark' ? darkTheme : lightTheme;

function App() {
  const data = useTwitterProxy('/api/v1/proxy');
  const [searchTerm, setSearchTerm] = useState('');
  console.log(data);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <div id="root-container">
        <header>
          <H1>Tweet Feed</H1>
          <MasonryItem width="70%">
            <TextInputWithIcon
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by keyword"
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
            <p>give me the content</p>
          </Card>
        </MasonryItem>
      </div>
    </ThemeProvider>
  );
}

export default App;
