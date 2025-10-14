import React from "react";
import { Form, Row, Col } from "react-bootstrap";

export default function AboutForm({ showValidation=false }) {
  const inv = showValidation; // UI-only

  return (
    <Form noValidate>
      <Row className="g-3">
        <Col md={6}>
          <Form.Group controlId="aboutFirstName">
            <Form.Label><i className="bi bi-person-circle me-1" />First Name</Form.Label>
            <Form.Control placeholder="First name" required isInvalid={inv} />
            <Form.Control.Feedback type="invalid">Required.</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="aboutLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control placeholder="Last name" required isInvalid={inv} />
            <Form.Control.Feedback type="invalid">Required.</Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group controlId="aboutEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="name@email.com" required isInvalid={inv} />
            <Form.Control.Feedback type="invalid">Required.</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="aboutPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control placeholder="09xxxxxxxx" required isInvalid={inv} />
            <Form.Control.Feedback type="invalid">Required.</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="aboutAge">
            <Form.Label>Age</Form.Label>
            <Form.Control type="number" min={1} placeholder="18" required isInvalid={inv} />
            <Form.Control.Feedback type="invalid">Required.</Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col md={12}>
          <Form.Group controlId="aboutAvatar">
            <Form.Label>Avatar</Form.Label>
            <Form.Control type="file" accept="image/*" required isInvalid={inv} />
            <Form.Control.Feedback type="invalid">Required.</Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
}
