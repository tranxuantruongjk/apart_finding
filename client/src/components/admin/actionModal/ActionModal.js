import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const ActionModal = ({
  showActionModal,
  setShowActionModal,
  action,
  setAction,
}) => {
  const [reason, setReason] = useState("");
  const handleChangeReason = (e) => {
    console.log(e.target.value);
    setReason(e.target.value);
  };

  const handleClose = () => setShowActionModal(false);
  const handleAction = async (e) => {
    e.preventDefault();

    if (action.setPost) {
      let newRes;
      if (action.action.name === "rejectPost") {
        newRes = await action.action(action.object, reason);
      } else {
        newRes = await action.action(action.object);
      }
      if (newRes.success) {
        action.setPost((prev) => {
          return { ...prev, state: newRes.post.state };
        });
        setAction((action) => ({ ...action, success: true }));
      }
    } else {
      await action.action(action.object);
    }
    handleClose();
  };

  return action === null ? null : (
    <Modal show={showActionModal} onHide={handleClose}>
      <Form onSubmit={handleAction}>
        <Modal.Body>
          {action.message}
          {action.action.name === "rejectPost" && (
            <Form.Group className="mt-2 mb-2">
              <Form.Control
                value={reason}
                type="text"
                placeholder="Nêu lý do từ chối"
                onChange={handleChangeReason}
                required
              />
            </Form.Group>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Hủy
          </Button>
          <Button variant="primary" type="submit">
            {action.button}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ActionModal;
