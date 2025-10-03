import React from "react";
import { Navbar, Nav, Container, Form, Button } from "react-bootstrap";

export default function Header() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="px-4">
      <Container fluid className="d-flex justify-content-between align-items-center">
        
        {/* Logo bên trái */}
        <Navbar.Brand href="#home" className="fw-bold ms-3">
          Pizza House
        </Navbar.Brand>

        {/* Menu ở giữa */}
        <Nav className="d-flex align-items-center gap-4">
          <Nav.Link href="#home" className="fw-bold text-white">
            Home
          </Nav.Link>
          <Nav.Link href="#about" className="text-secondary">
            About Us
          </Nav.Link>
          <Nav.Link href="#contact" className="text-secondary">
            Contact
          </Nav.Link>
        </Nav>

        {/* Search bên phải */}
        <Form className="d-flex align-items-center me-3">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
          />
          <Button variant="danger">
            <i className="bi bi-search"></i>
          </Button>
        </Form>
      </Container>
    </Navbar>
  );
}
