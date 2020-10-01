import React from 'react';
import { mount } from 'enzyme';

import Modal from './Modal';

describe('Modal component', () => {
    it('should match snapshot', () => {
        expect(mount(<Modal />)).toMatchSnapshot();
    });
});
