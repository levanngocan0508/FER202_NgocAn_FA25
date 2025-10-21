import React, { useReducer } from 'react';
import { Form, Button, Card, Container, Row, Col, Modal } from 'react-bootstrap';

const initialState = {
  user: { username: '', password: '' },
  errors: {},
  showModal: false,
};

function validateAll(user) {
  const errs = {};
  if (user.username.trim() === '') errs.username = 'Username is required';
  if (user.password.trim() === '') errs.password = 'Password is required';
  return errs;
}

function reducer(state, action) {
  switch (action.type) {
    case 'CHANGE': {
      const { name, value } = action;
      const user = { ...state.user, [name]: value };
      let errors = { ...state.errors };

      if (value.trim() === '') {
        const label = name.charAt(0).toUpperCase() + name.slice(1);
        errors[name] = `${label} is required`;
      } else {
        const { [name]: removed, ...rest } = errors;
        errors = rest;
      }
      return { ...state, user, errors };
    }
    case 'SUBMIT': {
      const errors = validateAll(state.user);
      const ok = Object.keys(errors).length === 0;
      return { ...state, errors, showModal: ok };
    }
    case 'CLOSE_MODAL':
      return { ...initialState };
    default:
      return state;
  }
}

function LoginForm() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user, errors, showModal } = state;

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: 'CHANGE', name, value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'SUBMIT' });
  };

  const handleCloseModal = () => {
    dispatch({ type: 'CLOSE_MODAL' });
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card>
            <Card.Header>
              <h3 className="text-center">Login Form </h3>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username" className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={handleChange}
                    isInvalid={!!errors.username}
                    placeholder="Enter username"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="password" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    isInvalid={!!errors.password}
                    placeholder="Enter password"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Login
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Login Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-success text-center">Welcome, {user.username}!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default LoginForm;
