import React from "react";
import { Card, Button, Container, Row, Col, Form } from "react-bootstrap";

export default function Main() {
  return (
    <div>
      {/* Banner */}
      <div className="banner">
        <img
          src="/images/logo.jpg"   // ảnh trong public/images
          alt="Banner"
          className="banner-img"
        />
        <div className="banner-text">
          <h2>Neapolitan Pizza</h2>
          <p>
            If you are looking for traditional Italian pizza, the Neapolitan is
            the best option!
          </p>
        </div>
      </div>

      {/* Menu */}
      <Container className="py-5">
        <h2 className="text-white mb-4">Our Menu</h2>
        <Row>
          <Col md={3}>
            <Card>
              <div className="badge sale">SALE</div>
              <Card.Img variant="top" src="/images/pizza1.jpg" />
              <Card.Body>
                <Card.Title>Margherita Pizza</Card.Title>
                <p>
                  <del>$40.00</del> <span className="price">$24.00</span>
                </p>
                <Button variant="dark" className="w-100">
                  Buy
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card>
              <Card.Img variant="top" src="/images/pizza2.jpg" />
              <Card.Body>
                <Card.Title>Mushroom Pizza</Card.Title>
                <p>$25.00</p>
                <Button variant="dark" className="w-100">
                  Buy
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card>
              <div className="badge new">NEW</div>
              <Card.Img variant="top" src="/images/pizza3.jpg" />
              <Card.Body>
                <Card.Title>Hawaiian Pizza</Card.Title>
                <p>$30.00</p>
                <Button variant="dark" className="w-100">
                  Buy
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card>
              <div className="badge sale">SALE</div>
              <Card.Img variant="top" src="/images/pizza4.jpg" />
              <Card.Body>
                <Card.Title>Pesto Pizza</Card.Title>
                <p>
                  <del>$50.00</del> <span className="price">$30.00</span>
                </p>
                <Button variant="dark" className="w-100">
                  Buy
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Booking */}
      <Container className="text-center py-5">
        <h2 className="text-white">Book Your Table</h2>
        <Form>
          <Row className="mb-3">
            <Col>
              <Form.Control type="text" placeholder="Your Name *" />
            </Col>
            <Col>
              <Form.Control type="email" placeholder="Your Email *" />
            </Col>
            <Col>
              <Form.Select>
                <option>Select a Service</option>
                <option>Dine In</option>
                <option>Take Away</option>
              </Form.Select>
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Please write your comment"
            />
          </Form.Group>
          <div className="d-flex justify-content-start">
            <Button variant="warning">Send Message</Button>
          </div>
        </Form>
      </Container>
    </div>
  );
}
