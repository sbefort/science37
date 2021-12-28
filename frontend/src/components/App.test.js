import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { TwitterProvider } from '../context/twitterContext';
import App from './App';

const server = setupServer(
  rest.get('/api/v1/proxy', (req, res, ctx) => {
    // If this is a query with a new search term
    if (req.url.searchParams.get('q')) {
      return (
        res(ctx.json({
          tweets: [
            {
              id: '1473836604967976960',
              text: 'Karnataka: A resident of Mangaluru, Rajni Shetty feeds 800 stray dogs every day &amp; looks after dozens of dogs, cats,… https://t.co/zhIFRkJ8iz',
              user: {
                username: 'ANI',
                avatarUrl: 'https://pbs.twimg.com/profile_images/1497864299/ani_mic_logo_normal.jpg',
              },
              hashtags: [],
            },
            {
              id: '1473684789400059908',
              text: 'Cats in snow\n\n#meowed #meowedofficial #TheMeowedClub https://t.co/8wX6yjWKSP',
              user: {
                username: 'MeowedOfficial',
                avatarUrl: 'https://pbs.twimg.com/profile_images/1174276509046951936/30G0nyAF_normal.jpg',
              },
              hashtags: ['meowed', 'meowedofficial', 'TheMeowedClub'],
            },
          ],
          nextResults: '?max_id=1474698938800386049&q=cats&count=5&include_entities=1&result_type=popular',
          searchTerm: 'cats',
        }))
      );
    }

    // Else if getting next results for the same search term
    return (
      res(ctx.json({
        tweets: [
          {
            id: '1474454841988722704',
            text: 'Truly classy cats! 🐈 Happy anniversary to The Aristocats. https://t.co/NXiuGGr3b6',
            user: {
              username: 'Disney',
              avatarUrl: 'https://pbs.twimg.com/profile_images/1289584734494892032/Z1TjPU-z_normal.jpg',
            },
            hashtags: [],
          },
          {
            id: '1474371439092322307',
            text: 'Rise of Cats then ERA OF CATS!🐱🚀\n\n#catecoin #nft #gamefi #defi https://t.co/jBh67Sp5m5',
            user: {
              username: 'catecoin',
              avatarUrl: 'https://pbs.twimg.com/profile_images/1462375886603177988/ew6G72zo_normal.jpg',
            },
            hashtags: ['catecoin', 'nft', 'gamefi', 'defi'],
          },
        ],
        searchTerm: 'cats',
      }))
    );
  }),
);

// Enable API mocking before tests.
beforeAll(() => server.listen());
beforeEach(() => jest.useFakeTimers());
afterEach(() => {
  server.resetHandlers();
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});
afterAll(() => server.close());

test('changes the value of the search input as the user types', async () => {
  render(<TwitterProvider><App /></TwitterProvider>);
  const input = screen.getByRole('textbox');
  userEvent.type(input, 'cats');
  expect(input.value).toBe('cats');
  userEvent.type(input, '{backspace}{backspace}{backspace}{backspace}');
  expect(input.value).toBe('');

  await screen.findByText('Try searching to find some tweets!');
  expect(await screen.findByText('Try searching to find some tweets!')).toBeInTheDocument();
});

test('shows search results when user types a new search term', async () => {
  render(<TwitterProvider><App /></TwitterProvider>);
  const input = screen.getByRole('textbox');
  userEvent.type(input, 'cats');

  const headings = await screen.findAllByRole('heading', { level: 3 });
  expect(headings.length).toBe(2);
  expect(headings[0].textContent).toBe('@ANI');
  expect(headings[1].textContent).toBe('@MeowedOfficial');

  const avatars = await screen.findAllByRole('img');
  expect(avatars.length).toBe(2);
  expect(avatars[0]).toHaveAttribute('src', 'https://pbs.twimg.com/profile_images/1497864299/ani_mic_logo_normal.jpg');
  expect(avatars[1]).toHaveAttribute('src', 'https://pbs.twimg.com/profile_images/1174276509046951936/30G0nyAF_normal.jpg');
  expect(avatars[0]).toHaveAttribute('alt', 'ANI');
  expect(avatars[1]).toHaveAttribute('alt', 'MeowedOfficial');
});

test('filters search results when a hashtag is clicked', async () => {
  render(<TwitterProvider><App /></TwitterProvider>);
  const input = screen.getByRole('textbox');
  userEvent.type(input, 'cats');

  let headings;
  let avatars;

  // Before clicking a hashtag, there are two results shown.
  const hashtag = await screen.findAllByText('#meowed');
  headings = await screen.findAllByRole('heading', { level: 3 });
  expect(headings.length).toBe(2);
  avatars = await screen.findAllByRole('img');
  expect(avatars.length).toBe(2);

  // After clicking a hashtag, there is only one result shown.
  userEvent.click(hashtag[0]);
  headings = await screen.findAllByRole('heading', { level: 3 });
  expect(headings.length).toBe(1);
  avatars = await screen.findAllByRole('img');
  expect(avatars.length).toBe(1);

  // Clicking the same hashtag should reset the filter.
  userEvent.click(hashtag[0]);
  headings = await screen.findAllByRole('heading', { level: 3 });
  expect(headings.length).toBe(2);
  avatars = await screen.findAllByRole('img');
  expect(avatars.length).toBe(2);
});

test('fetch more tweets when "load more" button is clicked', async () => {
  render(<TwitterProvider><App /></TwitterProvider>);
  const input = screen.getByRole('textbox');
  userEvent.type(input, 'cats');

  const button = await screen.findByText('Load more');
  userEvent.click(button);
  await screen.findByTitle('Loading...');
  await waitForElementToBeRemoved(() => screen.queryByTitle('Loading...'));

  const headings = await screen.findAllByRole('heading', { level: 3 });
  expect(headings.length).toBe(4);
  const avatars = await screen.findAllByRole('img');
  expect(avatars.length).toBe(4);
});
