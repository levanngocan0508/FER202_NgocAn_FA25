import React from "react";
import { Navbar, Container, Nav, Image, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState, useAuth } from "../contexts/AuthContext";

const Header = () => {
  const { currentUser } = useAuthState() || {};
  const { logout } = useAuth() || {};
  const navigate = useNavigate();

  const handleLogout = () => {
    logout?.();
    navigate("/login");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="md">
      <Container>
        <Navbar.Brand as={Link} to="/">🎬 Movies</Navbar.Brand>
        <Nav className="ms-auto align-items-center">
          {currentUser ? (
            <>
              <div className="d-flex align-items-center me-3">
                <Image
                  src={currentUser.avatar}
                  alt={currentUser.fullName}
                  roundedCircle
                  width={32}
                  height={32}
                  className="me-2"
                />
                <span>
                  <span className="text-info">Xin chào {currentUser.fullName}</span>{" "}
                </span>
              </div>
              <Button size="sm" variant="light" onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
