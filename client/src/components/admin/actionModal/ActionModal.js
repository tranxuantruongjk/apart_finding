import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const ActionModal = ({ showActionModal, setShowActionModal, action }) => {
  const handleClose = () => setShowActionModal(false);
  const handleAction = async () => {
    await action.action(action.object);
    handleClose();
  }

  return action === null ? null : (
    <Modal show={showActionModal} onHide={handleClose}>
      <Modal.Body>{action.message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Hủy
        </Button>
        <Button variant="primary" onClick={handleAction}>
          {action.button}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ActionModal;
