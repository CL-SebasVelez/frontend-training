import React from 'react';
import { mount } from 'enzyme';

import ContactForm from './ContactForm';

describe('ContactForm component', () => {
    it('should match snapshot', () => {
        expect(mount(<ContactForm />)).toMatchSnapshot();
    });
});
