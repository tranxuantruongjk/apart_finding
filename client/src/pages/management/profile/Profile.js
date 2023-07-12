import React, { useContext, useState } from "react";

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

import { BsTelephoneFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

import { AuthContext } from "../../../contexts/AuthContext";
import AlertMessage from "../../../components/alertMessage/AlertMessage";
import ChangePasswordModal from "../../../components/changePassword/ChangePasswordModal";

import "./profile.scss";

const Profile = () => {
  const {
    authState: { user },
    updateUserInfo,
  } = useContext(AuthContext);

  const [userName, setUserName] = useState(user.username);
  const [userEmail, setUserEmail] = useState(user.email);
  const [alert, setAlert] = useState(null);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

  const handleChangeUserName = (e) => {
    setUserName(e.target.value);
  };

  const handleChangeUserEmail = (e) => {
    setUserEmail(e.target.value);
  };

  const updateUser = async (e) => {
    e.preventDefault();

    if (userName === user.username && userEmail === user.email) {
      setAlert({ type: "secondary", message: "Bạn chưa thay đổi thông tin." });
      setTimeout(() => setAlert(null), 5000);
    } else if (userName === "") {
      setAlert({
        type: "danger",
        message: "Tên hiển thị là thông tin bắt buộc.",
      });
      setTimeout(() => setAlert(null), 5000);
    } else {
      try {
        const res = await updateUserInfo(user._id, {
          username: userName,
          email: userEmail,
        });
        if (res.success) {
          setAlert({ type: "success", message: res.message });
          setTimeout(() => setAlert(null), 5000);
        } else {
          setAlert({ type: "danger", message: res.message });
          setTimeout(() => setAlert(null), 5000);
        }
      } catch (error) {
        setAlert({ type: "danger", message: "Đã xảy ra lỗi." });
        setTimeout(() => setAlert(null), 5000);
      }
    }
  };

  return (
    <div className="my-profile">
      <div className="my-profile__header">
        <h2>Thông tin cá nhân</h2>
      </div>
      <div className="my-profile__body">
        <AlertMessage info={alert} />
        <Form onSubmit={updateUser}>
          <Row className="mb-3">
            <Col sm={0} md={3}></Col>
            <Col xs={4} sm={4} md={2}>
              <Form.Label htmlFor="phone">Số điện thoại</Form.Label>
            </Col>
            <Col xs={8} sm={8} md={4}>
              <InputGroup>
                <InputGroup.Text>
                  <BsTelephoneFill />
                </InputGroup.Text>
                <Form.Control
                  name="phone"
                  id="phone"
                  disabled
                  value={user.phone}
                />
              </InputGroup>
            </Col>
            <Col sm={0} md={3}></Col>
          </Row>
          <Row className="mb-3">
            <Col sm={0} md={3}></Col>
            <Col xs={4} sm={4} md={2}>
              <Form.Label htmlFor="username">Tên hiển thị</Form.Label>
            </Col>
            <Col xs={8} sm={8} md={4}>
              <InputGroup>
                <InputGroup.Text>
                  <FaUserAlt />
                </InputGroup.Text>
                <Form.Control
                  name="username"
                  id="username"
                  value={userName}
                  onChange={handleChangeUserName}
                />
              </InputGroup>
            </Col>
            <Col sm={0} md={3}></Col>
          </Row>
          <Row className="mb-3">
            <Col sm={0} md={3}></Col>
            <Col xs={4} sm={4} md={2}>
              <Form.Label htmlFor="email">Email</Form.Label>
            </Col>
            <Col xs={8} sm={8} md={4}>
              <InputGroup>
                <InputGroup.Text>
                  <IoMdMail />
                </InputGroup.Text>
                <Form.Control
                  name="email"
                  id="email"
                  value={userEmail}
                  onChange={handleChangeUserEmail}
                />
              </InputGroup>
            </Col>
            <Col sm={0} md={3}></Col>
          </Row>
          <Row className="mb-3">
            <Col sm={0} md={3}></Col>
            <Col xs={4} sm={4} md={2}>
              <Form.Label>Mật khẩu</Form.Label>
            </Col>
            <Col xs={8} sm={8} md={4}>
              <p
                className="change-password"
                onClick={() => setShowChangePasswordModal(true)}
              >
                Đổi mật khẩu
              </p>
            </Col>
            <Col sm={0} md={3}></Col>
          </Row>
          <Row>
            <Col md={3}></Col>
            <Col md={6}>
              <Button type="submit" className="btn-update">
                Cập nhật
              </Button>
            </Col>
            <Col md={3}></Col>
          </Row>
        </Form>
      </div>
      <ChangePasswordModal
        show={showChangePasswordModal}
        setShow={setShowChangePasswordModal}
        userId={user && user._id}
      />
    </div>
  );
};

export default Profile;
