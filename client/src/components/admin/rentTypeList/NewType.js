import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { AdminPostContext } from "../../../contexts/admin/PostContext";
import ToastMessage from "../../toastMessage/ToastMessage";
import AlertMessage from "../../alertMessage/AlertMessage";

const NewType = ({ showNewTypeModal, setShowNewTypeModal }) => {
  // Context
  const { addRentType } = useContext(AdminPostContext);

  // State
  const [registerForm, setRegisterForm] = useState({
    type: "",
    name: "",
  });

  const [alert, setAlert] = useState(null);
  const [toast, setToast] = useState(null);

  const { type, name } = registerForm;

  const onChangeRegisterForm = (e) => {
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value,
    });
  };

  const register = async (e) => {
    e.preventDefault();

    try {
      const registerData = await addRentType(registerForm);
      if (registerData.success) {
        setShowNewTypeModal(false);
        setRegisterForm({
          type: "",
          name: "",
        });
        setToast({
          show: true,
          type: "success",
          message: registerData.message,
        });
        setTimeout(() => setToast(null), 5000);
      } else {
        setAlert({ type: "danger", message: registerData.message });
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
        show={showNewTypeModal}
        onHide={() => setShowNewTypeModal(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tạo loại phòng mới</Modal.Title>
        </Modal.Header>
        <div className="pt-2 pe-2 ps-2">
          <AlertMessage info={alert} />
        </div>
        <Form className="" onSubmit={register}>
          <Modal.Body>
            <Form.Group as={Row}>
              <Form.Label column md={3}>
                Loại phòng <span className="text-danger">*</span>
              </Form.Label>
              <Col md={9}>
                <Form.Control
                  type="text"
                  placeholder="Loại phòng VD: Apartment"
                  name="type"
                  required
                  className="mb-2"
                  value={type}
                  onChange={onChangeRegisterForm}
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
                  onChange={onChangeRegisterForm}
                />
              </Col>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowNewTypeModal(false)}
            >
              Hủy
            </Button>
            <Button variant="primary" type="submit">
              Tạo
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default NewType;
