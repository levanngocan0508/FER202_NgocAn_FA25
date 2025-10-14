import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Badge from "react-bootstrap/Badge";
import { carouselMovies } from "../../data/carousel";
import "./HomeCarousel.css";

export default function HomeCarousel() {
  if (!Array.isArray(carouselMovies) || carouselMovies.length === 0) return null;

  return (
    <div className="home-carousel">
      <Carousel interval={3000} data-bs-theme="dark" fade>
        {carouselMovies.map((m) => (
          <Carousel.Item key={m.id}>
            <img className="d-block w-100 hero" src={m.poster} alt={m.title} />
            <Carousel.Caption className="cap text-start">
              <h3 className="ttl">
                {m.title}{" "}
                <Badge bg="info" className="badge-light-text">{m.genre}</Badge>{" "}
                <Badge bg="secondary">{m.year}</Badge>
              </h3>
              <p className="desc">{m.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}
