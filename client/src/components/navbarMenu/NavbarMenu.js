import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { Link, useLocation } from "react-router-dom";
import "./navbarMenu.scss";

const navMenu = [
  {
    display: "Trang chủ",
    path: "/",
  },
  {
    display: "Cho thuê phòng trọ",
    path: "/a",
  },
  {
    display: "Cho thuê nhà nguyên căn",
    path: "/b",
  },
];

const NavbarMenu = () => {
  const { pathname } = useLocation();

  const active = navMenu.findIndex((e) => e.path === pathname);

  return (
    <Navbar expand="lg" bg="primary" variant="dark" className="shadow p-0">
      <Container>
        <Nav className="me-auto">
          {navMenu.map((menu, i) => (
            <Nav.Link
              className={`menuItem ${i === active ? 'actived' : ''} fw-bolder text-white px-3`}
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
  );
};

export default NavbarMenu;
