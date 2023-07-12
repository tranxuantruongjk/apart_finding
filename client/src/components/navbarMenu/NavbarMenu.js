import { useEffect, useState, useContext } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link, useLocation } from "react-router-dom";
import "./navbarMenu.scss";

import Logo from "../logo/Logo";
import { AuthContext } from "../../contexts/AuthContext";
import { PostContext } from "../../contexts/PostContext";

const NavbarMenu = () => {
  const {
    authState: { user },
  } = useContext(AuthContext);

  const { rentTypes } = useContext(PostContext);

  const [navMenu, setNavMenu] = useState([]);
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleCloseOffCanvas = () => setShowOffcanvas(false);
  const handleShowOffCanvas = () => setShowOffcanvas(true);

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
      path: `/posts/type/${rentType._id}`,
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
        <Navbar expand="xl" className="p-0 bg-body-tertiary">
          <Container fluid>
            <Navbar.Toggle onClick={handleShowOffCanvas} />
            <Navbar.Offcanvas
              show={showOffcanvas}
              aria-labelledby={`offcanvasNavbarLabel-expand-xl`}
              placement="start"
              onHide={handleCloseOffCanvas}
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-xl`}>
                  <Logo />
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="me-auto">
                  {navMenu.map((menu, i) => (
                    <Nav.Link
                      className={`menuItem ${
                        i === active ? "actived" : ""
                      } fw-bolder px-3`}
                      to={menu.path}
                      as={Link}
                      key={i}
                      onClick={handleCloseOffCanvas}
                    >
                      {menu.display}
                    </Nav.Link>
                  ))}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      )}
    </>
  );
};

export default NavbarMenu;
