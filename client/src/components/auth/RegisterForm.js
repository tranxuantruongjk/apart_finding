import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import AlertMessage from "../alertMessage/AlertMessage";

const RegisterForm = () => {
  // Context
  const { registerUser } = useContext(AuthContext);

  // Router
  const navigate = useNavigate();

  // State
  const [registerForm, setRegisterForm] = useState({
    username: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [alert, setAlert] = useState(null);

  const { username, phone, email, password, confirmPassword } = registerForm;

  const onChangeRegisterForm = (e) => {
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value,
    });
  };

  const register = async (e) => {
    e.preventDefault();

    const regexPhoneNumber = /(0[3|5|7|8|9])+([0-9]{8})\b/g;
    const regexEmail =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!phone.match(regexPhoneNumber)) {
      setAlert({
        type: "danger",
        message: "Không đúng định dạng của số điện thoại",
      });
      setTimeout(() => setAlert(null), 5000);
      return;
    }

    if (!email.match(regexEmail)) {
      setAlert({
        type: "danger",
        message: "Không đúng định dạng của email",
      });
      setTimeout(() => setAlert(null), 5000);
      return;
    }

    if (password !== confirmPassword) {
      setAlert({ type: "danger", message: "Mật khẩu không khớp" });
      setTimeout(() => setAlert(null), 5000);
      return;
    }

    if (password.length < 6) {
      setAlert({
        type: "danger",
        message: "Mật khẩu phải gồm 6 kí tự trở lên",
      });
      setTimeout(() => setAlert(null), 5000);
      return;
    }

    try {
      const registerData = await registerUser(registerForm);

      if (registerData.success) navigate("/");
      else {
        setAlert({ type: "danger", message: registerData.message });
        setTimeout(() => setAlert(null), 5000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Card className="mb-3">
        <Card.Header as="h3" className="text-center">
          ĐĂNG KÝ
        </Card.Header>
        <Card.Body>
          <AlertMessage info={alert} />
          <Form className="" onSubmit={register}>
            <Form.Group>
              <Form.Label>
                HỌ TÊN <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Họ và tên"
                name="username"
                required
                className="mb-2 mt--5"
                value={username}
                onChange={onChangeRegisterForm}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>
                SỐ ĐIỆN THOẠI <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Số điện thoại"
                name="phone"
                required
                className="mb-2 mt--5"
                value={phone}
                onChange={onChangeRegisterForm}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>EMAIL</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                name="email"
                className="mb-2 mt--5"
                value={email}
                onChange={onChangeRegisterForm}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>
                MẬT KHẨU <span className="text-danger">*</span>{" "}
                <Form.Text>Mật khẩu phải gồm 6 ký tự trở lên</Form.Text>
              </Form.Label>

              <Form.Control
                type="password"
                placeholder="Mật khẩu"
                name="password"
                required
                className="mb-2 mt--5"
                value={password}
                onChange={onChangeRegisterForm}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>
                XÁC NHẬN MẬT KHẨU <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Nhập lại mật khẩu"
                name="confirmPassword"
                required
                className="mb-3 mt--5"
                value={confirmPassword}
                onChange={onChangeRegisterForm}
              />
            </Form.Group>
            <div className="text-center">
              <Button variant="success" type="submit" className="mb-3">
                Đăng ký
              </Button>
              <div>
                Bạn đã có tài khoản?
                <Link to="/login">
                  <Button variant="info" size="sm" className="ms-2">
                    Đăng nhập
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

export default RegisterForm;
