import React, { useState } from 'react';
import Button from 'emerald-ui/lib/Button';
import Checkbox from 'emerald-ui/lib/Checkbox';
import TextField from 'emerald-ui/lib/TextField';
import Modal from '../Modal/Modal';
import { formData, validateForm } from './functions';

class ContactForm extends React.Component {
  constructor(props) {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      message: '',
      promotions: 'off',
      show: false,
      modalBody: [],
      errors: {},
      modalAccept: () => false,
      labels: {
        firstName: 'First name',
        lastName: 'Last name',
        email: 'Email',
        phone: 'Phone number',
        message: 'Message',
        promotions: 'Send me emails about breaking news and promotions.',
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  handleChange(event) {
    this.setState({ ...this.state, [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const form = document.querySelector('#form-contact-us');
    const data = formData(this.state.labels, this.state);
    const errors = validateForm(this.state);
    if (Object.keys(errors).length > 0) {
      this.setState({ errors: errors });
    } else {
      this.setState({
        show: true,
        modalBody: data,
        errors: {},
        modalAccept: () => {
          form.submit();
        },
      });
    }
  }
  open() {
    this.setState({ ...this.state, show: true });
  }

  close() {
    this.setState({ show: false });
  }

  render() {
    return (
      <>
        <Modal
          show={this.state.show}
          close={() => {
            this.close();
          }}
          title="All data is correct?"
          accept={() => this.state.modalAccept()}
          render={() => {
            return (
              <ul>
                {this.state.modalBody.map((x) => {
                  return (
                    <li>
                      <b>{x.text}</b>: {x.value}
                    </li>
                  );
                })}
              </ul>
            );
          }}
        />
        <form
          className="d-flex flex-wrap"
          id="form-contact-us"
          onSubmit={this.handleSubmit}
        >
          <div className="form-group w-50">
            <label htmlFor="firstName">First name</label>
            <TextField
              name="firstName"
              className="form-control validate w-88"
              onChange={this.handleChange}
              value={this.state.firstName}
              errorMessage={
                'firstName' in this.state.errors ? 'This field is required' : ''
              }
            />
          </div>
          <div className="form-group w-50">
            <label htmlFor="lastName">Last name</label>
            <TextField
              name="lastName"
              className="form-control validate w-88"
              onChange={this.handleChange}
              value={this.state.lastName}
              errorMessage={
                'lastName' in this.state.errors ? 'This field is required' : ''
              }
            />
          </div>
          <div className="form-group w-50 mt-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              className={`form-control validate ${
                'email' in this.state.errors ? 'border-error' : ''
              }`}
              onChange={this.handleChange}
              defaultValue={this.state.email}
            />
            {'email' in this.state.errors ? (
              <p className="text-error">{this.state.errors.email}</p>
            ) : (
              ''
            )}
          </div>
          <div className="form-group w-50 mt-2">
            <label htmlFor="number">Phone number</label>
            <input
              type="number"
              name="phone"
              className={`form-control validate ${
                'phone' in this.state.errors ? 'border-error' : ''
              }`}
              onChange={this.handleChange}
              defaultValue={this.state.phone}
            />
            {'phone' in this.state.errors ? (
              <p className="text-error">{this.state.errors.phone}</p>
            ) : (
              ''
            )}
          </div>
          <div className="form-group w-100 mt-3">
            <label htmlFor="message">Message</label>
            <TextField
              name="message"
              className="form-control validate w-94"
              onChange={this.handleChange}
              value={this.state.message}
              textarea={true}
              errorMessage={
                'message' in this.state.errors ? 'This field is required' : ''
              }
            />
            <p className="d-none text-error">This field is required</p>
          </div>
          <div className="form-group w-100">
            <Checkbox
              name="promotions"
              label="Send me emails about breaking news and promotions."
              onChange={this.handleChange}
              defaultChecked={false}
            />
          </div>
          <div className="form-group w-100 d-flex j-content-center">
            <Button
              className="a-self-center mt-5 btn btn-default"
              id="more-stories"
              color="info"
              type="submit"
            >
              <span>Submit form</span>
            </Button>
          </div>
        </form>
      </>
    );
  }
}
export default ContactForm;
