import React, { useReducer } from 'react';
import { Form, Button, Card, Container, Row, Col, Modal, Toast } from 'react-bootstrap';

// Regex helpers
const isEmail = (v) => /\S+@\S+\.[A-Za-z]{2,}/.test(v);
const isUsername = (v) => /^[A-Za-z0-9._]{3,}$/.test(v.trim());
const isStrongPassword = (v) =>
  /[A-Z]/.test(v) &&        // có chữ hoa
  /[a-z]/.test(v) &&        // có chữ thường
  /\d/.test(v) &&           // có số
  /[^A-Za-z0-9]/.test(v) && // có ký tự đặc biệt
  v.length >= 8;            // độ dài

// Validate 1 field
function validate(field, value, snapshot) {
  switch (field) {
    case 'username':
      if (!value.trim()) return 'Username is required';
      if (!isUsername(value)) return '≥ 3 chars, letters/numbers/._ only, no spaces';
      return '';
    case 'email':
      if (!value.trim()) return 'Email is required';
      if (!isEmail(value)) return 'Invalid email format';
      return '';
    case 'password':
      if (!value) return 'Password is required';
      if (!isStrongPassword(value)) return '≥8 chars, upper, lower, number, special';
      return '';
    case 'confirm':
      if (!value) return 'Please confirm password';
      if (value !== snapshot.password) return 'Passwords do not match';
      return '';
    default:
      return '';
  }
}

// Validate all fields
function validateAll(snapshot) {
  const e = {};
  for (const field of Object.keys(snapshot)) {
    const msg = validate(field, snapshot[field], snapshot);
    if (msg) e[field] = msg;
  }
  return e;
}

const initialForm = { username: '', email: '', password: '', confirm: '' };

const initialState = {
  form: initialForm,
  errors: validateAll(initialForm),
  showModal: false,
  showToast: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'CHANGE': {
      const { name, value } = action;
      const nextForm = { ...state.form, [name]: value };
      return { ...state, form: nextForm, errors: validateAll(nextForm) };
    }
    case 'SUBMIT': {
      const newErrors = validateAll(state.form);
      const ok = Object.keys(newErrors).length === 0;
      return {
        ...state,
        errors: newErrors,
        showToast: ok,
        showModal: ok,
      };
    }
    case 'CANCEL':
      return { ...initialState };
    case 'CLOSE_TOAST':
      return { ...state, showToast: false };
    case 'CLOSE_MODAL':
      return { ...state, showModal: false };
    default:
      return state;
  }
}

export default function RegisterForm() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { form, errors, showModal, showToast } = state;
  const isValid = Object.keys(errors).length === 0;

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: 'CHANGE', name, value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'SUBMIT' });
  };
  const handleCancel = () => dispatch({ type: 'CANCEL' });

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={7}>
          <Card>
            <Card.Header>
              <h3 className="text-center m-0">Sign Up</h3>
            </Card.Header>
            <Card.Body>
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group controlId="username" className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    isInvalid={!!errors.username}
                    placeholder="Enter username"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="email" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                    placeholder="Enter email"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="password" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    isInvalid={!!errors.password}
                    placeholder="Enter password"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="confirm" className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirm"
                    value={form.confirm}
                    onChange={handleChange}
                    isInvalid={!!errors.confirm}
                    placeholder="Confirm password"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.confirm}
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="d-flex gap-2">
                  <Button variant="primary" type="submit" disabled={!isValid} className="w-100">
                    Submit
                  </Button>
                  <Button variant="outline-secondary" type="button" onClick={handleCancel} className="w-100">
                    Cancel
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Toast thông báo submit thành công */}
      <Toast
        show={showToast}
        onClose={() => dispatch({ type: 'CLOSE_TOAST' })}
        delay={2000}
        autohide
        style={{ position: 'fixed', top: 20, right: 20, minWidth: 220, zIndex: 9999 }}
      >
        <Toast.Header>
          <strong className="me-auto text-success">Success</strong>
        </Toast.Header>
        <Toast.Body>Submitted successfully!</Toast.Body>
      </Toast>

      {/* Modal hiển thị thông tin đã submit */}
      <Modal show={showModal} onHide={() => dispatch({ type: 'CLOSE_MODAL' })} centered>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Body>
              <p><strong>Username:</strong> {form.username}</p>
              <p><strong>Email:</strong> {form.email}</p>
              <p><strong>Password:</strong> {'•'.repeat(form.password.length)}</p>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => dispatch({ type: 'CLOSE_MODAL' })}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
