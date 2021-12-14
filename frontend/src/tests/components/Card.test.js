import React from 'react';
import { mount } from 'enzyme';
import Card from '../../components/Card';

describe('Avatar.jsx', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <Card>
        <h2>Card Heading</h2>
        <p>Card Paragraph</p>
      </Card>
    );
  });

  it('should render a card with children', () => {
    const h2 = wrapper.find('h2');
    const p = wrapper.find('p');
    expect(h2.text()).toBe('Card Heading');
    expect(p.text()).toBe('Card Paragraph');
  });
});
