import React, { useReducer } from "react";
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from "react-bootstrap";
import { useAuthState, useAuth } from "../contexts/AuthContext";
import { useNavigate, Navigate } from "react-router-dom";

const initial = { identifier: "", password: "", errors: {} };

function reducer(state, action) {
  switch (action.type) {
    case "CHANGE": return { ...state, [action.name]: action.value, errors: { ...state.errors, [action.name]: "" } };
    case "ERRORS": return { ...state, errors: action.errors || {} };
    default: return state;
  }
}

const Login = () => {
  const [state, dispatch] = useReducer(reducer, initial);
  const { currentUser, loading, error } = useAuthState() || {};
  const { login } = useAuth() || {};
  const navigate = useNavigate();

  if (currentUser) return <Navigate to="/" replace />;

  const validate = () => {
    const errs = {};
    if (!state.identifier.trim()) errs.identifier = "Nhập email hoặc username";
    if (!state.password.trim()) errs.password = "Nhập mật khẩu";
    dispatch({ type: "ERRORS", errors: errs });
    return Object.keys(errs).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const res = await login(state.identifier.trim(), state.password);
    if (res?.ok) navigate("/");
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Đăng nhập</Card.Title>
              {error ? <Alert variant="danger" className="mb-3">{error}</Alert> : null}
              <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="identifier">
                  <Form.Label>Email hoặc Username</Form.Label>
                  <Form.Control
                    type="text"
                    value={state.identifier}
                    onChange={(e) => dispatch({ type: "CHANGE", name: "identifier", value: e.target.value })}
                    isInvalid={!!state.errors.identifier}
                    placeholder="admin hoặc admin@example.com"
                  />
                  <Form.Control.Feedback type="invalid">{state.errors.identifier}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Mật khẩu</Form.Label>
                  <Form.Control
                    type="password"
                    value={state.password}
                    onChange={(e) => dispatch({ type: "CHANGE", name: "password", value: e.target.value })}
                    isInvalid={!!state.errors.password}
                    placeholder="••••••••"
                  />
                  <Form.Control.Feedback type="invalid">{state.errors.password}</Form.Control.Feedback>
                </Form.Group>

                <div className="d-grid">
                  <Button type="submit" disabled={loading}>
                    {loading ? <Spinner size="sm" /> : "Đăng nhập"}
                  </Button>
                </div>
              </Form>
              <div className="mt-3 text-muted">Demo: admin/admin123 • student/student123</div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
