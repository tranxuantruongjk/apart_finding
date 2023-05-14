import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import NavDropdown from "react-bootstrap/NavDropdown";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Logo from "../logo/Logo";
import NavbarMenu from "../navbarMenu/NavbarMenu";

import "./header.scss";

const Header = () => {
  const {
    authState: { isAuthenticated, user },
    logoutUser,
  } = useContext(AuthContext);

  const logout = async () => {
    await logoutUser();
  };

  return (
    <>
      {user && user.role === 1 ? (
        <></>
      ) : (
        <Container className="d-flex justify-content-between header">
          <div className="header__logo">
            <Link to={"/"} className="text-decoration-none">
              <Logo />
            </Link>
          </div>
          <NavbarMenu />
          <div className="header__btn d-flex justify-content-between align-items-center">
            {isAuthenticated ? (
              <>
                <p className="mb-0 me-2">
                  Xin chào,
                  <Link
                    to={"/me/profile"}
                    className="ms-1 text-decoration-none"
                  >
                    {user.username}
                  </Link>
                </p>
                <NavDropdown className="me-4">
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
              <Link to="/me/create" className="text-decoration-none">
                <Button className="d-flex align-items-center">
                  <span>Đăng tin mới</span>
                  <AiOutlinePlusCircle className="ms-1"/>
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      )}
    </>
  );
};

export default Header;
