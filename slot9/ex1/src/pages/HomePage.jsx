import React from "react";
import HomeCarousel from "../components/Carousel/HomeCarousel";
import { Row, Col } from "react-bootstrap";
import MovieCard from "../components/Movie/MovieCard";
import { movies } from "../data/movies";

export default function HomePage() {
  return (
    <div>
      <HomeCarousel />

      <div className="mt-4 container">
        <h4 className="mb-3">Featured Movies Collections</h4>

        {/* Grid responsive: xs=1, md=2, lg=3 cột */}
        <Row xs={1} md={2} lg={3} className="g-4">
          {movies.map((m) => (
            <Col key={m.id}>
              <MovieCard movie={m} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
