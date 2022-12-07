import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const NavbarMenu = () => {
  return (
    <Navbar expand="lg" bg="primary" variant="dark" className="shadow">
      <Container>
        <Nav className="me-auto">
          {/* <Nav.Link
            className="fw-bolder text-white"
            to="/"
            as={Link}
          > */}
          <a href="/" className="fw-bolder text-white ms-2 me-4">
            Trang chủ
          </a>
          {/* </Nav.Link> */}
          {/* <Nav.Link
            className="fw-bolder text-white"
            to="/"
            as={Link}
          > */}
          <a href="/" className="fw-bolder text-white me-4">
            Cho thuê phòng trọ
          </a>
          {/* </Nav.Link> */}
          <a href="/" className="fw-bolder text-white">
            Cho thuê nguyên căn
          </a>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavbarMenu;
