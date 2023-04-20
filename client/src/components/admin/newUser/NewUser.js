import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { UserContext } from "../../../contexts/admin/UserContext";
import ToastMessage from "../../toastMessage/ToastMessage";
import AlertMessage from "../../alertMessage/AlertMessage";

const NewUser = ({ showNewUserModal, setShowNewUserModal }) => {
  // Context
  const { registerUser } = useContext(UserContext);

  // State
  const [registerForm, setRegisterForm] = useState({
    username: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: 0,
  });

  const [alert, setAlert] = useState(null);
  const [toast, setToast] = useState(null);

  const { username, phone, email, password, confirmPassword, role } =
    registerForm;

  const onChangeRegisterForm = (e) => {
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value,
    });
  };

  const register = async (e) => {
    e.preventDefault();
    // console.log(registerForm);

    if (password !== confirmPassword) {
      setAlert({ type: "danger", message: "Mật khẩu không khớp" });
      setTimeout(() => setAlert(null), 5000);
      return;
    }

    try {
      const registerData = await registerUser(registerForm, "admin");

      if (registerData.success) {
        setShowNewUserModal(false);
        setRegisterForm({
          username: "",
          phone: "",
          email: "",
          password: "",
          confirmPassword: "",
          role: 0,
        });
        setToast({
          show: true,
          type: "success",
          message: "Tạo tài khoản thành công",
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
        show={showNewUserModal}
        onHide={() => setShowNewUserModal(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tạo tài khoản mới</Modal.Title>
        </Modal.Header>
        <div className="pt-2 pe-2 ps-2">
          <AlertMessage info={alert} />
        </div>
        <Form className="" onSubmit={register}>
          <Modal.Body>
            <Form.Group as={Row}>
              <Form.Label column md={3}>
                Họ tên <span className="text-danger">*</span>
              </Form.Label>
              <Col md={9}>
                <Form.Control
                  type="text"
                  placeholder="Họ và tên"
                  name="username"
                  required
                  className="mb-2"
                  value={username}
                  onChange={onChangeRegisterForm}
                  autoFocus
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column md={3}>
                Điện thoại <span className="text-danger">*</span>
              </Form.Label>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Số điện thoại"
                  name="phone"
                  required
                  className="mb-2"
                  value={phone}
                  onChange={onChangeRegisterForm}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column md={3}>
                Email
              </Form.Label>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Email"
                  name="email"
                  className="mb-2"
                  value={email}
                  onChange={onChangeRegisterForm}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column md={3}>
                Vai trò <span className="text-danger">*</span>
              </Form.Label>
              <Col>
                <Form.Select
                  name="role"
                  className="mb-2"
                  value={role}
                  onChange={onChangeRegisterForm}
                >
                  <option value={0}>User</option>
                  <option value={1}>Admin</option>
                </Form.Select>
              </Col>
            </Form.Group>
            <Row>
              <Form.Group as={Col}>
                <Form.Label className="mb-1">
                  Mật khẩu <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Mật khẩu"
                  name="password"
                  required
                  className="mb-2"
                  value={password}
                  onChange={onChangeRegisterForm}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label className="mb-1">
                  Xác nhận mật khẩu <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Nhập lại mật khẩu"
                  name="confirmPassword"
                  required
                  className="mb-3"
                  value={confirmPassword}
                  onChange={onChangeRegisterForm}
                />
              </Form.Group>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowNewUserModal(false)}
            >
              Hủy
            </Button>
            <Button variant="primary" type="submit">
              Đăng ký
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default NewUser;
