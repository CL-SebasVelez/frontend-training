import React from 'react';
import { mount } from 'enzyme';

import NewsCard from './NewsCard';

describe('NewsCard component', () => {
    it('should match snapshot', () => {
        expect(mount(<NewsCard />)).toMatchSnapshot();
    });
});
