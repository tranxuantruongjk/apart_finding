import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import logo from "../../assets/images/apart_logo.svg";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import NavDropdown from 'react-bootstrap/NavDropdown';

const Header = () => {
  const {
    authState: { isAuthenticated, user },
    logoutUser
  } = useContext(AuthContext);

  // console.log(user);
  const logout = async () => {
    await logoutUser();
  };

  return (
    <Container className="d-flex justify-content-between">
      <div className="header__logo">
        <img src={logo} />
      </div>
      <div className="header__btn d-flex justify-content-between align-items-center">
        {isAuthenticated ? (
          <>
            <p className="mb-0 me-2">Xin chào {user.username}</p>
            <NavDropdown className="me-4" >
              <NavDropdown.Item>Thông tin cá nhân</NavDropdown.Item>
              <NavDropdown.Item>Quản lý tin đăng</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                <Link to="/logout" className="btn__logout" onClick={logout}>
                  Đăng xuất
                </Link>
              </NavDropdown.Item>
            </NavDropdown>
          </>
        ) : (
          <>
            <Link to="/login" className="me-4 btn__login">
              Đăng nhập
            </Link>
            <Link to="/register" className="me-4 btn__signup">
              Đăng ký
            </Link>
          </>
        )}
        <div className="btn__post">
          <Link to="/me/create" >
            <Button>Đăng tin mới</Button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default Header;
