import React from "react";
import Modal from "react-bootstrap/Modal";
import Badge from "react-bootstrap/Badge";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";

export default function MovieDetailModal({ show, onHide, movie }) {
  if (!movie) return null;

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
      aria-labelledby="movie-detail-title"
    >
      <Modal.Header closeButton className="bg-light">
        <Modal.Title id="movie-detail-title" className="d-flex align-items-center gap-2">
          {movie.title}
          {movie.genre ? <Badge bg="dark">{movie.genre}</Badge> : null}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Row className="g-3">
          <Col md={5}>
            <Image
              src={movie.poster}
              alt={`${movie.title} poster`}
              rounded
              fluid
            />
          </Col>
          <Col md={7}>
            <p className="text-muted mb-3">
              {movie.description || movie.desc}
            </p>
            <ListGroup variant="flush" className="small">
              <ListGroup.Item><strong>Year:</strong> {movie.year}</ListGroup.Item>
              <ListGroup.Item><strong>Country:</strong> {movie.country}</ListGroup.Item>
              <ListGroup.Item><strong>Duration:</strong> {movie.duration} minutes</ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
