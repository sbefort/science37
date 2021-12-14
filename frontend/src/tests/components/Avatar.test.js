// Work in progress...
// Will update tests for panel interview

import React from 'react';
import { shallow } from 'enzyme';
import Avatar from '../../components/Avatar';

describe('Avatar.js', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Avatar
        src="https://www.science37.com/image.png"
      />
    );
  });

  it('should render an avatar with src and alt attributes', () => {
    const img = wrapper.find('img');
    expect(img.props()).toHaveProperty('src', 'https://www.science37.com/image.png');
    expect(img.props()).toHaveProperty('alt', '');

    wrapper.setProps({
      src: 'https://www.cats.com/cat.jpg',
      alt: 'Cool Cat',
    });
    const img2 = wrapper.find('img');
    expect(img2.props()).toHaveProperty('src', 'https://www.cats.com/cat.jpg');
    expect(img2.props()).toHaveProperty('alt', 'Cool Cat');
  });
});
