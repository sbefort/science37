import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../styles/theme';
import { GlobalStyles } from '../styles/global';

const params = new URLSearchParams(window.location.search);
const theme = params.get('theme') === 'dark' ? darkTheme : lightTheme;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <h1>Science 37 React Code Challenge</h1>
      <footer>
      </footer>
    </ThemeProvider>
  );
}

export default App;
