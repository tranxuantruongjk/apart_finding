import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import logo from "../../assets/images/apart_logo.svg";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import NavDropdown from 'react-bootstrap/NavDropdown';

import "./header.scss";

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
            <p className="mb-0 me-2">Xin chào, 
              <Link to={"/me/profile"} className="ms-1 text-decoration-none">
                {user.username}
              </Link>
            </p>
            <NavDropdown className="me-4" >
              <NavDropdown.Item className="my-item">
                <Link to="/me/posts" className="my-posts">
                  Quản lý tin đăng
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item className="my-item">
                <Link to="/me/profile" className="my-profile">
                  Thông tin cá nhân
                </Link>  
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item className="my-item">
                <Link to="/" className="btn__logout" onClick={logout}>
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
