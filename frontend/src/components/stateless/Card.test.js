import { render, screen } from '@testing-library/react';
import Card from './Card';

test('renders a card with children', () => {
  render(
    <Card>
      <h2>Card Heading</h2>
      <p>Card Paragraph</p>
    </Card>,
  );
  expect(screen.getByRole('heading').textContent).toBe('Card Heading');
  expect(screen.getByText('Card Paragraph')).toBeInTheDocument();
});
