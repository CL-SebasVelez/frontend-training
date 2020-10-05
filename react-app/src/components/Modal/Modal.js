import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'emerald-ui/lib/Modal';
import Button from 'emerald-ui/lib/Button';

function DefaultModal(props) {
  return (
    <div>
      <Modal
        onHide={() => {
          props.close();
        }}
        show={props.show}
      >
        <Modal.Header closeButton={true}>
          <Modal.Title className="Hi">{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="defaultRender">{props.render()}</Modal.Body>
        <Modal.Footer>
          <Modal.Footer>
            <Button onClick={props.close} shape="flat" color="info">
              Cancel
            </Button>
            <Button color="info" onClick={props.accept}>
              {props.acceptButton}
            </Button>
          </Modal.Footer>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

DefaultModal.propTypes = {
  show: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
  accept: PropTypes.func.isRequired,
  acceptButton: PropTypes.string.isRequired,
};

DefaultModal.defaultProps = {
  show: false,
  close: function () {
    this.show = false;
  },
  title: 'Information',
  render: () => <div className="defaultRender">There's not Information</div>,
  accept: function () {
    this.show = false;
  },
  acceptButton: 'Accept',
};

export default DefaultModal;
