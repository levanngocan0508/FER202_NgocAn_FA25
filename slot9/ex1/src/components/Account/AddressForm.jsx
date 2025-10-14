import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

export default function AddressForm({ showValidation=false, onPrev=()=>{}, onFinish=()=>{} }) {
  const inv = showValidation;

  return (
    <>
      <Form noValidate>
        <Row className="g-3">
          <Col md={8}>
            <Form.Group controlId="addrStreet">
              <Form.Label><i className="bi bi-geo-alt me-1" />Street</Form.Label>
              <Form.Control placeholder="123 Main St" required isInvalid={inv} />
              <Form.Control.Feedback type="invalid">Required.</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="addrCity">
              <Form.Label>City</Form.Label>
              <Form.Control placeholder="City" required isInvalid={inv} />
              <Form.Control.Feedback type="invalid">Required.</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="addrCountry">
              <Form.Label>Country</Form.Label>
              <Form.Select defaultValue="" required isInvalid={inv}>
                <option value="" disabled>Choose...</option>
                <option>Vietnam</option>
                <option>Singapore</option>
                <option>Japan</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">Required.</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="addrZip">
              <Form.Label>Zip Code</Form.Label>
              <Form.Control placeholder="700000" required isInvalid={inv} />
              <Form.Control.Feedback type="invalid">Required.</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
      </Form>

      <div className="d-flex justify-content-between mt-3">
        <Button variant="secondary" onClick={onPrev}>Previous</Button>
        <Button variant="success" onClick={onFinish}>Finish</Button>
      </div>
    </>
  );
}
