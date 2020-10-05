import React from 'react';
import '../../test/setup.js';
import { shallow, mount, render } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import ContactForm from '../../components/ContactForm';
import Navbar from '../../components/Navbar';
import HomeScreen from './HomeScreen.js';

describe('HomeScreen', () => {
  var wrapper;
  beforeEach(() => {
    wrapper = mount(<HomeScreen />);
  });

  it('Should exits Navbar component', () => {
    let navbarComponent = wrapper.find(Navbar);
    expect(navbarComponent).to.have.lengthOf(1);
  });
  it('Should exits ContactForm component', () => {
    let contactFormComponent = wrapper.find(ContactForm);
    expect(contactFormComponent).to.have.lengthOf(1);
  });
});
