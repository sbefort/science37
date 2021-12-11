import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../styles/theme';
import { GlobalStyles } from '../styles/global';
import SplitScreen from './SplitScreen';
import Section from './Section';
import H1 from './H1';
import FormInput from './FormInput';
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
        <Section marginTop={20} marginBottom={12}>
          <H1>Tweet Feed</H1>
        </Section>
        <SplitScreen leftWeight={7} rightWeight={3}>
          <Section>
            <FormInput onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search by keyword" />
            <button onClick={() => console.log(searchTerm)}>Click Me</button>
          </Section>
          <Section>
            hashtags go here
          </Section>
        </SplitScreen>
        <footer>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;
