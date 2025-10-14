// src/pages/ContactPage.jsx
import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import "./ContactPage.css";

export default function ContactPage() {
  const [validated, setValidated] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    setValidated(true);
    if (!form.checkValidity()) return;
    setSending(true);

    // giả lập gửi – chỉ hiển thị toast
    const toast = (msg, v="success") =>
      typeof window.appToast === "function"
        ? window.appToast(msg, v)
        : window.dispatchEvent(new CustomEvent("app:toast", { detail: { message: msg, variant: v } }));

    setTimeout(() => {
      setSending(false);
      form.reset();
      setValidated(false);
      toast("Your message has been sent. We’ll get back soon.", "success");
    }, 700);
  };

  return (
    <Container className="py-5">
      <Row className="g-4">
        {/* Info */}
        <Col lg={5}>
          <Card className="shadow-sm h-100">
            <Card.Header className="bg-white fw-semibold">Contact Information</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <i className="bi bi-geo-alt me-2 text-primary"></i>
                Tầng 4, TTTM Vincom Đà Nẵng, đường Ngô Quyền, phường An Hải Bắc, quận Sơn Trà, TP. Đà Nẵng
              </ListGroup.Item>
              <ListGroup.Item>
                <i className="bi bi-envelope me-2 text-primary"></i>
                hoidap@cgv.vn
              </ListGroup.Item>
              <ListGroup.Item>
                <i className="bi bi-telephone me-2 text-primary"></i>
                +84 511 3 747 666
              </ListGroup.Item>
              <ListGroup.Item>
                <i className="bi bi-clock-history me-2 text-primary"></i>
                24/7 
              </ListGroup.Item>
              <ListGroup.Item>
                <i className="bi bi-share me-2 text-primary"></i>
                <a href="#!" className="link-secondary me-2">Facebook</a>
                <a href="#!" className="link-secondary me-2">Twitter</a>
                <a href="#!" className="link-secondary">Instagram</a>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>

        {/* Form */}
        <Col lg={7}>
          <Card className="shadow-sm">
            <Card.Header className="bg-white fw-semibold">Send us a message</Card.Header>
            <Card.Body>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group controlId="cName">
                      <Form.Label>Full name</Form.Label>
                      <Form.Control required placeholder="Your name" />
                      <Form.Control.Feedback type="invalid">
                        Please enter your name.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="cEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control required type="email" placeholder="you@example.com" />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid email.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group controlId="cSubject">
                      <Form.Label>Subject</Form.Label>
                      <Form.Control required placeholder="How can we help?" />
                      <Form.Control.Feedback type="invalid">
                        Subject is required.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group controlId="cMessage">
                      <Form.Label>Message</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        required
                        placeholder="Tell us a bit more…"
                      />
                      <Form.Control.Feedback type="invalid">
                        Please write your message.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col xs="auto">
                    <Button type="submit" disabled={sending}>
                      {sending ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" />
                          Sending…
                        </>
                      ) : (
                        <>
                          <i className="bi bi-send me-2"></i>Send message
                        </>
                      )}
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
