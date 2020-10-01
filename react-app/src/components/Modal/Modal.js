import React from 'react';
import Modal from 'emerald-ui/lib/Modal';
import Button from 'emerald-ui/lib/Button';

function DefaultModal(props) {
  return (
    <div>
      <Modal
        onHide={() => {
          props.close();
        }}
        show={props.show || false}
      >
        <Modal.Header closeButton={true}>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.render()}</Modal.Body>
        <Modal.Footer>
          <Modal.Footer>
            <Button onClick={props.close} shape="flat" color="info">
              Cancel
            </Button>
            <Button color="info" onClick={props.accept}>
              {props.acceptButton || 'Accept'}
            </Button>
          </Modal.Footer>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DefaultModal;
