// Work in progress...
// Will update tests for panel interview

import { render, screen } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';
import App from '../../components/App';

describe('App.js', () => {
  it('changes the value of the search input as the user types', () => {
    render(<App />);
    const input = screen.getByRole('textbox');
    expect(input.value).toBe('');
    fireEvent.change(input, {target: {value: 'chiefs'}})
    expect(input.value).toBe('chiefs')
  });
});
