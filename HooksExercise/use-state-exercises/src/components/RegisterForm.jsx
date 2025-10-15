import React, { useMemo, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Modal,
  Toast,
  InputGroup,
} from 'react-bootstrap';

export default function RegisterForm() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirm: '',
  });
  const [errors, setErrors] = useState({});
  const [showToast, setshowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const validators = {
    username: (v) => {
      const trimmed = v.trim();
      if (trimmed.length < 3) return 'Username must be at least 3 characters';
      if (trimmed !== v) return 'No leading/trailing spaces';
      if (!/^[A-Za-z0-9._]+$/.test(trimmed)) return 'Only letters, digits, . or _';
      return '';
    },
    email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Invalid email'),
    password: (v) => {
      if (v.length < 8) return 'Min 8 characters';
      if (!/[a-z]/.test(v)) return 'Need a lowercase';
      if (!/[A-Z]/.test(v)) return 'Need an uppercase';
      if (!/[0-9]/.test(v)) return 'Need a digit';
      if (!/[^A-Za-z0-9]/.test(v)) return 'Need a special char';
      return '';
    },
    confirm: (v, all) => (v === all.password ? '' : 'Passwords do not match'),
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const next = { ...prev, [name]: value };
      const msg = validators[name](value, next);
      setErrors((prevErr) => ({ ...prevErr, [name]: msg || undefined }));
      return next;
    });
  };

  const isValid = useMemo(() => {
    const u = validators.username(form.username) === '';
    const m = validators.email(form.email) === '';
    const p = validators.password(form.password) === '';
    const c = validators.confirm(form.confirm, form) === '';
    return u && m && p && c;
  }, [form]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {
      username: validators.username(form.username),
      email: validators.email(form.email),
      password: validators.password(form.password),
      confirm: validators.confirm(form.confirm, form),
    };
    setErrors(newErrors);
    const ok = Object.values(newErrors).every((x) => x === '');
    if (ok) {
      setshowToast(true);
      setShowModal(true);
    }
  };

  const handleCancel = () => {
    setForm({ username: '', email: '', password: '', confirm: '' });
    setErrors({});
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <Container className="mt-4">
      {/* Toast góc phải trên */}
      <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1080 }}>
        <Toast onClose={() => setshowToast(false)} show={showToast} autohide delay={2000}>
          <Toast.Header>
            <strong className="me-auto">Notice</strong>
          </Toast.Header>
          <Toast.Body>Submitted successfully!</Toast.Body>
        </Toast>
      </div>

      <Row className="justify-content-center">
        <Col md={7} lg={6}>
          <Card>
            <Card.Header>
              <h4 className="mb-0 text-center">Register</h4>
            </Card.Header>

            <Card.Body>
              <Form onSubmit={handleSubmit} noValidate>
                {/* Username */}
                <Form.Group className="mb-3" controlId="regUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    isInvalid={!!errors.username}
                    placeholder="your.name"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Email */}
                <Form.Group className="mb-3" controlId="regEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                    placeholder="you@example.com"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Password */}
                <Form.Group className="mb-3" controlId="regPassword">
                  <Form.Label>Password</Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      type={showPwd ? 'text' : 'password'}
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      isInvalid={!!errors.password}
                      placeholder="••••••••"
                    />
                    <Button
                      type="button"
                      variant="outline-secondary"
                      onClick={() => setShowPwd((s) => !s)}
                      aria-label={showPwd ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                    >
                      {showPwd ? 'Ẩn' : 'Hiện'}
                    </Button>
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>

                {/* Confirm */}
                <Form.Group className="mb-4" controlId="regConfirm">
                  <Form.Label>Confirm password</Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      type={showConfirm ? 'text' : 'password'}
                      name="confirm"
                      value={form.confirm}
                      onChange={handleChange}
                      isInvalid={!!errors.confirm}
                      placeholder="••••••••"
                    />
                    <Button
                      type="button"
                      variant="outline-secondary"
                      onClick={() => setShowConfirm((s) => !s)}
                      aria-label={showConfirm ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                    >
                      {showConfirm ? 'Ẩn' : 'Hiện'}
                    </Button>
                    <Form.Control.Feedback type="invalid">
                      {errors.confirm}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>

                <div className="d-flex gap-2">
                  <Button
                    type="submit"
                    variant="primary"
                    className="flex-grow-1"
                    disabled={!isValid}
                  >
                    Submit
                  </Button>
                  <Button type="button" variant="outline-secondary" onClick={handleCancel}>
                    Cancel
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal + Card hiển thị thông tin đã submit */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Registration Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card bg="light">
            <Card.Body>
              <div>
                <strong>Username:</strong> {form.username.trim()}
              </div>
              <div>
                <strong>Email:</strong> {form.email}
              </div>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
