import { render, screen } from '@testing-library/react';
import Avatar from './Avatar';

test('renders an avatar with the correct src and alt attributes', () => {
  const { rerender } = render(
    <Avatar
      src="https://www.science37.com/image.png"
    />,
  );
  expect(screen.getByRole('img')).toHaveAttribute('src', 'https://www.science37.com/image.png');
  expect(screen.getByRole('img')).toHaveAttribute('alt', '');

  rerender(
    <Avatar
      src="https://www.cats.com/cat.jpg"
      alt="Cool Cat"
    />,
  );
  expect(screen.getByRole('img')).toHaveAttribute('src', 'https://www.cats.com/cat.jpg');
  expect(screen.getByRole('img')).toHaveAttribute('alt', 'Cool Cat');
});
