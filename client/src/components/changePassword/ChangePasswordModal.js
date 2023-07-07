import { useState, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { AuthContext } from "../../contexts/AuthContext";
import AlertMessage from "../alertMessage/AlertMessage";

const ChangePasswordModal = ({ show, setShow, userId }) => {
  const { changePassword } = useContext(AuthContext);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reEnterNewPassword, setReEnterNewPassword] = useState("");
  const [alert, setAlert] = useState(null);

  const handleClose = () => setShow(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== reEnterNewPassword) {
      setAlert({ type: "danger", message: "Mật khẩu mới không khớp" });
      setTimeout(() => setAlert(null), 5000);
    } else if (oldPassword === newPassword) {
      setAlert({
        type: "danger",
        message: "Mật khẩu mới trùng với mật khẩu mới",
      });
      setTimeout(() => setAlert(null), 5000);
    } else {
      const response = await changePassword(userId, {
        oldPassword,
        newPassword,
      });

      if (response.success) {
        setOldPassword("");
        setNewPassword("");
        setReEnterNewPassword("");
        setAlert({ type: "success", message: response.message });
        setTimeout(() => setAlert(null), 5000);
        setTimeout(() => handleClose(), 5000);
      } else {
        setAlert({ type: "danger", message: response.message });
        setTimeout(() => setAlert(null), 5000);
      }
    }
  };

  return (
    <div className="change-password">
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className="change-password-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Đổi mật khẩu</Modal.Title>
        </Modal.Header>
        <AlertMessage info={alert} />
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Row>
                <Col md={5}>
                  <Form.Label>Mật khẩu cũ</Form.Label>
                </Col>
                <Col md={7}>
                  <Form.Control
                    type="password"
                    required
                    placeholder="Nhập mật khẩu cũ"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3">
              <Row>
                <Col md={5}>
                  <Form.Label>Mật khẩu mới</Form.Label>
                </Col>
                <Col md={7}>
                  <Form.Control
                    type="password"
                    required
                    placeholder="Nhập mật khẩu mới"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3">
              <Row>
                <Col md={5}>
                  <Form.Label>Xác nhận mật khẩu mới</Form.Label>
                </Col>
                <Col md={7}>
                  <Form.Control
                    type="password"
                    required
                    placeholder="Nhập lại mật khẩu mới"
                    value={reEnterNewPassword}
                    onChange={(e) => setReEnterNewPassword(e.target.value)}
                  />
                </Col>
              </Row>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Hủy
            </Button>
            <Button type="submit" variant="primary">
              Cập nhật
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default ChangePasswordModal;
