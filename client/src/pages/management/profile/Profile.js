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

import "./profile.scss";
// import defaultAvatar from "../../../assets/images/default-user.png";

const Profile = () => {
  const {
    authState: { user },
    updateUserInfo
  } = useContext(AuthContext);

  const [userName, setUserName] = useState(user.username);
  const [userEmail, setUserEmail] = useState(user.email);
  const [alert, setAlert] = useState(null);

  const handleChangeUserName = (e) => {
    setUserName(e.target.value);
  };

  const handleChangeUserEmail = (e) => {
    setUserEmail(e.target.value);
  };

  const updateUser = async (e) => {
    e.preventDefault();

    if (userName === user.username && userEmail === user.email) {
      setAlert({ type: "secondary", message: "Bạn chưa thay đổi thông tin."});
      setTimeout(() => setAlert(null), 5000);
    } else if (userName === "") {
      setAlert({ type: "danger", message: "Tên hiển thị là thông tin bắt buộc."});
      setTimeout(() => setAlert(null), 5000);
    } else {
      try {
        const res = await updateUserInfo(user._id, {username: userName, email: userEmail});
        if (res.success) {
          setAlert({ type: "success", message: res.message});
          setTimeout(() => setAlert(null), 5000);
        } else {
          setAlert({ type: "danger", message: res.message});
          setTimeout(() => setAlert(null), 5000);
        }
      } catch (error) {
        setAlert({ type: "danger", message: "Đã xảy ra lỗi."});
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
          {/* <Row className="mb-3">
            <Col md={3}></Col>
            <Col md={2}>
              <Form.Label>Ảnh đại diện</Form.Label>
            </Col>
            <Col md={4}>
              <div className="avatar-wrapper">
                <div className="avatar-inner">
                    <img src={defaultAvatar} alt="default-avatar" className="avatar-preview" />
                </div>
                <Button variant="secondary" className="btn-avatar">Chọn ảnh</Button>
              </div>
            </Col>
            <Col md={3}></Col>
          </Row> */}
          <Row className="mb-3">
            <Col md={3}></Col>
            <Col md={2}>
              <Form.Label htmlFor="phone">Số điện thoại</Form.Label>
            </Col>
            <Col md={4}>
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
            <Col md={3}></Col>
          </Row>
          <Row className="mb-3">
            <Col md={3}></Col>
            <Col md={2}>
              <Form.Label htmlFor="username">Tên hiển thị</Form.Label>
            </Col>
            <Col md={4}>
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
            <Col md={3}></Col>
          </Row>
          <Row className="mb-3">
            <Col md={3}></Col>
            <Col md={2}>
              <Form.Label htmlFor="email">Email</Form.Label>
            </Col>
            <Col md={4}>
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
            <Col md={3}></Col>
          </Row>
          <Row className="mb-3">
            <Col md={3}></Col>
            <Col md={2}>
              <Form.Label>Mật khẩu</Form.Label>
            </Col>
            <Col md={4}>
              <p className="change-password">Đổi mật khẩu</p>
            </Col>
            <Col md={3}></Col>
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
    </div>
  );
};

export default Profile;