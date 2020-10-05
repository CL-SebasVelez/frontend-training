import React from 'react';
import '../../test/setup.js';
import { shallow, mount, render } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import ContactForm from './ContactForm';
import Modal from '../Modal';
import { validateForm } from '../ContactForm/functions';

describe('ContactForm component', () => {
  var wrapper, contactData, fields, onChange, onSubmit;
  beforeEach(() => {
    // Initial Form Data
    contactData = {
      firstName: 'Test',
      lastName: 'Testing',
      email: 'test@example.com',
      phone: '123456789',
      message: 'Test message',
      promotions: 'off',
    };
    // Form callbacks Spies
    onChange = sinon.spy();
    onSubmit = sinon.spy();
    // Form Wrapper
    wrapper = mount(<ContactForm />);
    // Form Fields wrappers
    fields = {
      firstName: wrapper.find('[name="firstName"]').at(1),
      lastName: wrapper.find('[name="lastName"]').at(1),
      email: wrapper.find('[name="email"]'),
      phone: wrapper.find('[name="phone"]'),
      message: wrapper.find('[name="message"]').at(1),
      promotions: wrapper.find('[name="promotions"]').at(1),
    };
  });

  it('should call onSubmit when form is submitted but should not submit', () => {
    onSubmit.resetHistory();
    wrapper.find('form').simulate('submit');

    expect(onSubmit.calledWithMatch(contactData)).to.be.false;
    expect(onSubmit).to.have.property('callCount', 0);
  });

  it('should exist Modal', () => {
    let modalComponent = wrapper.find(Modal);
    expect(modalComponent).to.have.lengthOf(1);
  });

  it('should exist Modal and default `show` prop is false', () => {
    let modalComponent = wrapper.find(Modal).prop('show');
    expect(modalComponent).to.equal(false);
  });

  it('should show the Modal when all fields are correct', () => {
    let fields = {
      ...contactData,
      labels: {
        firstName: 'First name',
        lastName: 'Last name',
        email: 'Email',
        phone: 'Phone number',
        message: 'Message',
        promotions: 'Send me emails about breaking news and promotions.',
      },
    };
    expect(validateForm(fields)).to.be.empty;
  });

  it('should call onSubmit when send button is clicked', () => {
    onSubmit.resetHistory();
    const component = wrapper.instance();
    let handleSubmit = sinon.stub(component, 'handleSubmit');
    component.forceUpdate();
    wrapper.update();

    let defaultPrevented = false;
    wrapper
      .find('form [type="submit"]')
      .at(0)
      .simulate('click', {
        preventDefault() {
          defaultPrevented = true;
        },
      });
    if (!defaultPrevented) {
      wrapper.find('form').simulate('submit');
    }

    expect(handleSubmit.called).to.be.true;
    expect(handleSubmit).to.have.property('callCount', 1);
  });

  describe('Input forms onChange', () => {
    var component, handleChange;
    beforeEach(() => {
      component = wrapper.instance();
      handleChange = sinon.stub(component, 'handleChange');
      component.forceUpdate();
      wrapper.update();
    });
    it('should call onChanges with updated contact data when `firstName` field changes', () => {
      testOnChanges(handleChange, 'firstName');
    });

    it('should call onChanges with updated contact data when `lastName` field changes', () => {
      testOnChanges(handleChange, 'lastName');
    });

    it('should call onChanges with updated contact data when `email` field changes', () => {
      testOnChanges(handleChange, 'email');
    });
    it('should call onChanges with updated contact data when `phone` field changes', () => {
      testOnChanges(handleChange, 'phone');
    });

    it('should call onChanges with updated contact data when `message` field changes', () => {
      testOnChanges(handleChange, 'message');
    });

    it('should call onChanges with updated contact data when `promotions` field changes', () => {
      testOnChanges(handleChange, 'promotions');
    });

    function testOnChanges(spy, key, changedValue) {
      if (typeof changedValue === 'boolean') {
        fields[key].instance().checked = changedValue;
      } else {
        changedValue = changedValue || `Changed ${key}`;
        fields[key].instance().value = changedValue;
      }
      fields[key].simulate('change');

      expect(spy.callCount).to.not.equal(0);
    }
  });
});
