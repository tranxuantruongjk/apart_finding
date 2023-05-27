import { useEffect, useState, useContext } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { Link, useLocation } from "react-router-dom";
import "./navbarMenu.scss";

import { AuthContext } from "../../contexts/AuthContext";
import { PostContext } from "../../contexts/PostContext";

const NavbarMenu = () => {
  const {
    authState: { user },
  } = useContext(AuthContext);

  const { rentTypes } = useContext(PostContext);

  const [navMenu, setNavMenu] = useState([]);

  const { pathname } = useLocation();
  let active;

  if (pathname === "/") {
    active = 0;
  } else {
    active = navMenu.slice(1).findIndex((e) => pathname.includes(e.path)) + 1;
    if (active === 0) {
      active = -1;
    }
  }

  useEffect(() => {
    const navArr = rentTypes.map((rentType) => ({
      display: rentType.name,
      path: `/${rentType._id}`,
    }));
    const homePath = [
      {
        display: "Trang chủ",
        path: "/",
      },
    ];
    setNavMenu([...homePath, ...navArr]);
  }, [rentTypes]);

  return (
    <>
      {user && user.role === 1 ? (
        <></>
      ) : (
        <Navbar expand="lg" variant="dark" className="p-0">
          <Container>
            <Nav className="me-auto">
              {navMenu.map((menu, i) => (
                <Nav.Link
                  className={`menuItem ${
                    i === active ? "actived" : ""
                  } fw-bolder px-3`}
                  to={menu.path}
                  as={Link}
                  key={i}
                >
                  {menu.display}
                </Nav.Link>
              ))}
            </Nav>
          </Container>
        </Navbar>
      )}
    </>
  );
};

export default NavbarMenu;
