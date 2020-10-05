import React from 'react';
import renderer from 'react-test-renderer';

import Modal from './Modal';

describe('Modal component', () => {
  it('should render with default props', () => {
    const tree = renderer.create(<Modal />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should launch error when pass wrong prop types', () => {
    const { show, close, title, render, accept, acceptButton } = 10;
    expect(() =>
      shallow(
        <Modal
          title={title}
          show={show}
          close={close}
          render={render}
          accept={accept}
          acceptButton={acceptButton}
        />
      )
    ).toThrowError();
  });

  it('should render all props as passed it', () => {
    const title = 'New Modal';
    const show = false;
    const close = () => {
      return 'closing Modal';
    };
    const render = () => <div>Render</div>;
    const accept = () => {
      return 'accepting Modal';
    };
    const acceptButton = 'Accept';
    const testRenderer = renderer.create(
      <Modal
        title={title}
        show={show}
        close={close}
        render={render}
        accept={accept}
        acceptButton={acceptButton}
      />
    );
    const testInstance = testRenderer.root;
    expect(testInstance.findByType(Modal).props.title).toBe(title);
    expect(testInstance.findByType(Modal).props.show).toBe(show);
    expect(testInstance.findByType(Modal).props.close).toBe(close);
    expect(testInstance.findByType(Modal).props.render).toBe(render);
    expect(testInstance.findByType(Modal).props.accept).toBe(accept);
    expect(testInstance.findByType(Modal).props.acceptButton).toBe(
      acceptButton
    );
  });

  it('should not show the modal when pass `show` prop as false', () => {
    const testRenderer = renderer.create(<Modal show={false} />);
    const testInstance = testRenderer.root;
    expect(testInstance.findByType(Modal).props.show).toBe(false);
  });
});
