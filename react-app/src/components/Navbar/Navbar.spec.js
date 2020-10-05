import React from 'react';
import { mount } from 'enzyme';

import Navbar from './Navbar';

describe('Navbar component', () => {
    it('should match snapshot', () => {
        expect(mount(<Navbar />)).toMatchSnapshot();
    });
});
