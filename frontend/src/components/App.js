import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../styles/theme';
import { GlobalStyles } from '../styles/global';
import { IoSearchSharp } from "react-icons/io5";
import SplitScreen from './SplitScreen';
import Section from './Section';
import H1 from './H1';
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
        <Section>
          <H1>Tweet Feed</H1>
        </Section>
        <SplitScreen leftWeight={7} rightWeight={3}>
          <Section>
            <TextInputWithIcon
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by keyword"
              iconComponent={<IoSearchSharp color="#ccc" fontSize="1.5em" />}
            />
            <Card>
              <h1>card me</h1>
            </Card>
          </Section>
          <Section>
            <Card>
              <h1>hash tags</h1>
            </Card>
          </Section>
        </SplitScreen>
      </div>
    </ThemeProvider>
  );
}

export default App;
