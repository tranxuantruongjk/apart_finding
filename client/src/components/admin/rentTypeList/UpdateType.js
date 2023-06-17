import React, { useState, useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { AdminPostContext } from "../../../contexts/admin/PostContext";
import ToastMessage from "../../toastMessage/ToastMessage";
import AlertMessage from "../../alertMessage/AlertMessage";

const UpdateType = ({
  showUpdateTypeModal,
  setShowUpdateTypeModal,
  rentType,
}) => {
  // Context
  const { updateRentType } = useContext(AdminPostContext);

  // State
  const [updatedType, setUpdatedType] = useState(rentType);
  useEffect(() => setUpdatedType(rentType), [rentType]);

  const [alert, setAlert] = useState(null);
  const [toast, setToast] = useState(null);

  const { type, name } = updatedType;

  const onChangeUpdateForm = (e) => {
    setUpdatedType({
      ...updatedType,
      [e.target.name]: e.target.value,
    });
  };

  const update = async (e) => {
    e.preventDefault();

    try {
      const updatedData = await updateRentType(updatedType);
      if (updatedData.success) {
        setShowUpdateTypeModal(false);
        setUpdatedType({
          type: "",
          name: "",
        });
        setToast({
          show: true,
          type: "success",
          message: updatedData.message,
        });
        setTimeout(() => setToast(null), 5000);
      } else {
        setAlert({ type: "danger", message: updatedData.message });
        setTimeout(() => setAlert(null), 5000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ToastMessage info={toast} />
      <Modal
        show={showUpdateTypeModal}
        onHide={() => setShowUpdateTypeModal(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa loại phòng</Modal.Title>
        </Modal.Header>
        <div className="pt-2 pe-2 ps-2">
          <AlertMessage info={alert} />
        </div>
        <Form className="" onSubmit={update}>
          <Modal.Body>
            <Form.Group as={Row}>
              <Form.Label column md={3}>
                Loại phòng <span className="text-danger">*</span>
              </Form.Label>
              <Col md={9}>
                <Form.Control
                  type="text"
                  placeholder="Loại phòng VD: apartment"
                  name="type"
                  required
                  className="mb-2"
                  value={type}
                  onChange={onChangeUpdateForm}
                  autoFocus
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column md={3}>
                Tên <span className="text-danger">*</span>
              </Form.Label>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Tên loại phòng VD: Căn hộ"
                  name="name"
                  required
                  className="mb-2"
                  value={name}
                  onChange={onChangeUpdateForm}
                />
              </Col>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowUpdateTypeModal(false)}
            >
              Hủy
            </Button>
            <Button variant="primary" type="submit">
              Lưu thay đổi
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateType;
