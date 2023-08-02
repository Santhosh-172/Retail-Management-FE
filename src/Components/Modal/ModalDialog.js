import React from "react";
import { Modal, Button } from "react-bootstrap";

function ModalDialog(props) {
  const [isShow, invokeModal] = React.useState(false);
  const initModal = () => {
    return invokeModal(!isShow);
  };
  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.children}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            {props.closeAction}
          </Button>
          <Button variant="primary" onClick={props.handlePrimaryAction}>
            {props.primaryAction}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default ModalDialog;
