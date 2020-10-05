import React from 'react';
import '../../test/setup.js';
import { shallow, mount, render } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import ContactForm from '../../components/ContactForm';
import Navbar from '../../components/Navbar';
import HomeScreen from './HomeScreen.js';
import Alert from 'emerald-ui/lib/Alert/Alert';
import Spinner from 'emerald-ui/lib/Spinner/Spinner';
import NewsCard from '../../components/NewsCard/index.js';

describe('HomeScreen', () => {
  var wrapper;
  beforeEach(() => {
    wrapper = mount(<HomeScreen />);
  });

  it('Should exist Navbar component', () => {
    let navbarComponent = wrapper.find(Navbar);
    expect(navbarComponent).to.have.lengthOf(1);
  });

  it('Should exist ContactForm component', () => {
    let contactFormComponent = wrapper.find(ContactForm);
    expect(contactFormComponent).to.have.lengthOf(1);
  });

  it('Should exist Alert component', () => {
    let alertComponent = wrapper.find(Alert);
    expect(alertComponent).to.have.lengthOf(1);
  });

  it('Should exist Spinner component', () => {
    let spinnerComponent = wrapper.find(Spinner);
    expect(spinnerComponent).to.have.lengthOf(1);
  });
});
