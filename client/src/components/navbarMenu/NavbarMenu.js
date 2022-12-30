import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const NavbarMenu = () => {
  return (
    <Navbar expand="lg" bg="primary" variant="dark" className="shadow p-0">
      <Container>
        <Nav className="me-auto">
          <Nav.Link className="fw-bolder text-white me-4" to="/" as={Link}>
            Trang chủ
          </Nav.Link>
          <Nav.Link className="fw-bolder text-white me-4" to="/" as={Link}>
            Cho thuê phòng trọ
          </Nav.Link>
          <Nav.Link className="fw-bolder text-white" to="/" as={Link}>
            Cho thuê nguyên căn
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavbarMenu;
