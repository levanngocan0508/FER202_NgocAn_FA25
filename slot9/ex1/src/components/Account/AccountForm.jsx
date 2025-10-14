import React from "react";
import { Form, Row, Col, InputGroup } from "react-bootstrap";

export default function AccountForm({ showValidation=false }) {
  const inv = showValidation;

  return (
    <Form noValidate>
      <Row className="g-3">
        <Col md={6}>
          <Form.Group controlId="accUsername">
            <Form.Label><i className="bi bi-person-circle me-1" />Username</Form.Label>
            <InputGroup>
              <InputGroup.Text><i className="bi bi-person" /></InputGroup.Text>
              <Form.Control placeholder="username" required isInvalid={inv} />
              <Form.Control.Feedback type="invalid">Required.</Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group controlId="accPassword">
            <Form.Label><i className="bi bi-lock me-1" />Password</Form.Label>
            <InputGroup>
              <InputGroup.Text><i className="bi bi-lock" /></InputGroup.Text>
              <Form.Control type="password" placeholder="********" required isInvalid={inv} />
              <Form.Control.Feedback type="invalid">Required.</Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group controlId="accConfirm">
            <Form.Label>Confirm Password</Form.Label>
            <InputGroup>
              <InputGroup.Text><i className="bi bi-shield-lock" /></InputGroup.Text>
              <Form.Control type="password" placeholder="********" required isInvalid={inv} />
              <Form.Control.Feedback type="invalid">Required.</Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group controlId="accSecretQ">
            <Form.Label>Secret Question</Form.Label>
            <Form.Control placeholder="Your first pet?" required isInvalid={inv} />
            <Form.Control.Feedback type="invalid">Required.</Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col md={12}>
          <Form.Group controlId="accAnswer">
            <Form.Label>Answer</Form.Label>
            <Form.Control placeholder="Answer" required isInvalid={inv} />
            <Form.Control.Feedback type="invalid">Required.</Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
}
