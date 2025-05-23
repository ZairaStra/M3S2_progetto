import { Navbar, Nav, Container } from "react-bootstrap";
import logo from "../assets/logo.svg";

const WeatherNavbar = () => (
  <Navbar expand="lg" className=" mb-3 py-4 bars-style" bg="light" data-bs-theme="light" sticky="top">
    <Container fluid>
      <Navbar.Brand href="/Homepage" className="d-flex align-items-center">
        <img alt="brand-icon" src={logo} width="40" height="50" className="d-inline-block align-middle" />
        <span className="ms-3 d-none d-md-block">Painting Weather</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link href="#">Choose your Country</Nav.Link>
          <Nav.Link href="#">World</Nav.Link>
          <Nav.Link href="#">Sea & Wind</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default WeatherNavbar;
