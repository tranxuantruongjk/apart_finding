import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import AlertMessage from "../alertMessage/AlertMessage";

const LoginForm = () => {
  // Context
  const { loginUser } = useContext(AuthContext);

  // Router
  const navigate = useNavigate();

  const [loginForm, setLoginForm] = useState({
    phone: "",
    password: "",
  });
  const [alert, setAlert] = useState(null);

  const { phone, password } = loginForm;

  const onChangeLoginForm = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };

  const login = async (e) => {
    e.preventDefault();

    try {
      const loginData = await loginUser(loginForm);
      if (loginData.success) {
        if (loginData.user.role === 1) {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        setAlert({ type: "danger", message: loginData.message });
        setTimeout(() => setAlert(null), 5000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Card>
        <Card.Header as="h3" className="text-center">
          ĐĂNG NHẬP
        </Card.Header>
        <Card.Body>
          <AlertMessage info={alert} />
          <Form className="" onSubmit={login}>
            <Form.Group>
              <Form.Label>SỐ ĐIỆN THOẠI</Form.Label>
              <Form.Control
                type="text"
                placeholder="Số điện thoại"
                name="phone"
                required
                className="mb-2 mt--5"
                value={phone}
                onChange={onChangeLoginForm}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>MẬT KHẨU</Form.Label>
              <Form.Control
                type="password"
                placeholder="Mật khẩu"
                name="password"
                required
                className="mb-3 mt--5"
                value={password}
                onChange={onChangeLoginForm}
              />
            </Form.Group>
            <div className="text-center">
              <Button variant="success" type="submit" className="mb-3">
                Đăng nhập
              </Button>
              <div>
                Bạn chưa có tài khoản?
                <Link to="/register">
                  <Button variant="info" size="sm" className="ms-2">
                    Đăng ký
                  </Button>
                </Link>
              </div>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default LoginForm;
