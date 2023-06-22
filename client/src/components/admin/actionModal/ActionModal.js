import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const ActionModal = ({ showActionModal, setShowActionModal, action, setAction }) => {
  const handleClose = () => setShowActionModal(false);
  const handleAction = async () => {
    if (action.setPost) {
      const newRes = await action.action(action.object);
      
      if (newRes.success) {
        action.setPost((prev) => {
          return { ...prev, state: newRes.post.state };
        });

        setAction((action) => ({...action, success: true}));
      }
    } else {
      if (action.actionName) {
        await action.action(action.actionName, action.object);
      } else {
        await action.action(action.object);
      }
    }
    handleClose();
  };

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
