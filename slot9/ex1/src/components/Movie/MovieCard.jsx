import React, { useState, useMemo } from "react";

import { Card, Badge, Button, Modal, Toast, ToastContainer } from "react-bootstrap";
import "./MovieCard.css";

export default function MovieCard({ movie }) {
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const shortDesc = useMemo(() => {
    if (!movie?.description) return "";
    const s = movie.description.trim();
    return s.length > 120 ? s.slice(0, 117) + "..." : s;
  }, [movie]);

  const addToFavourites = () => {
    try {
      const key = "favourites";
      const raw = localStorage.getItem(key);
      const arr = raw ? JSON.parse(raw) : [];
      if (!arr.find((x) => x.id === movie.id)) {
        arr.push({ id: movie.id, title: movie.title, poster: movie.poster });
        localStorage.setItem(key, JSON.stringify(arr));
      }
      setShowToast(true);
    } catch {
      setShowToast(true);
    }
  };

  return (
    <>
      <Card className="movie-card h-100">
        <div className="poster-wrap">
          <Card.Img
            variant="top"
            src={movie.poster}
            alt={`${movie.title} poster`}
            className="poster-img"
            loading="lazy"
          />
          <Badge bg="dark" className="genre-badge">{movie.genre}</Badge>
        </div>

        <Card.Body>
          <Card.Title className="movie-title">{movie.title}</Card.Title>
          <Card.Text className="movie-desc">{shortDesc}</Card.Text>

          <div className="meta-row">
            <span className="meta"><strong>Year:</strong> {movie.year}</span>
            <span className="meta"><strong>Country:</strong> {movie.country}</span>
            <span className="meta"><strong>Duration:</strong> {movie.duration}’</span>
          </div>

          <div className="btn-row">
            <Button variant="primary" size="sm" onClick={addToFavourites}>
              Add to Favourites
            </Button>
            <Button variant="outline-secondary" size="sm" onClick={() => setShowModal(true)}>
              View Details
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* Toast */}
      <ToastContainer position="top-center" className="p-3">
        <Toast show={showToast} onClose={() => setShowToast(false)} delay={1400} autohide>
          <Toast.Body>Added to favourites!</Toast.Body>
        </Toast>
      </ToastContainer>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{movie.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-body-flex">
            <img
              src={movie.poster}
              alt={`${movie.title} poster`}
              className="modal-poster"
              loading="lazy"
            />
            <div className="modal-info">
              <div className="mb-2">
                <Badge bg="info" className="me-2 text-dark">{movie.genre}</Badge>
                <Badge bg="secondary" className="me-2">{movie.year}</Badge>
                <Badge bg="dark">{movie.country}</Badge>
              </div>
              <p className="mb-2">{movie.description}</p>
              <p className="mb-1"><strong>Duration:</strong> {movie.duration} minutes</p>
              {Array.isArray(movie.showtimes) && movie.showtimes.length > 0 && (
                <p className="mb-0">
                  <strong>Showtimes:</strong> {movie.showtimes.join(" • ")}
                </p>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
