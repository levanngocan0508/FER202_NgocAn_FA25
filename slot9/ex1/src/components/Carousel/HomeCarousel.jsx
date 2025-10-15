// src/components/Carousel/HomeCarousel.jsx
import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Badge from "react-bootstrap/Badge";
import { carouselMovies } from "../../data/carousel";
import "./HomeCarousel.css";

export default function HomeCarousel() {
  if (!Array.isArray(carouselMovies) || carouselMovies.length === 0) return null;

  // === NEW: cuộn tới MovieCard ứng với phim ===
  const goToMovieCard = (movie) => {
    try {
      // 1) cuộn về khu Home (nếu đang ở chỗ khác)
      document.getElementById("home")?.scrollIntoView({ behavior: "smooth" });

      // 2) sau một nhịp, tìm đúng card theo alt của ảnh poster trong MovieCard
      //    (MovieCard dùng: <Card.Img className="poster-img" alt={`${title} poster`}>)
      let tries = 0;
      const maxTries = 12; // ~2.4s
      const timer = setInterval(() => {
        tries += 1;

        const sel = `.movie-card img.poster-img[alt="${movie.title} poster"]`;
        const imgEl = document.querySelector(sel);
        if (imgEl) {
          clearInterval(timer);
          const card = imgEl.closest(".movie-card");
          if (card && typeof card.scrollIntoView === "function") {
            card.scrollIntoView({ behavior: "smooth", block: "center" });

            // Highlight nhẹ (không cần CSS file): tạm thời thêm box-shadow rồi gỡ
            const prev = card.style.boxShadow;
            card.style.boxShadow = "0 0 0 0.25rem rgba(13,110,253,.35)";
            setTimeout(() => {
              card.style.boxShadow = prev || "";
            }, 1200);
          }
        } else if (tries >= maxTries) {
          clearInterval(timer);
        }
      }, 200);
    } catch {}
  };

  return (
    <div className="home-carousel">
      <Carousel interval={3000} data-bs-theme="dark" fade>
        {carouselMovies.map((m) => (
          <Carousel.Item
            key={m.id}

            // NEW: cho phép click toàn slide để đi tới MovieCard
            onClick={() => goToMovieCard(m)}
            role="button"
            tabIndex={0}
            style={{ cursor: "pointer" }}
          >
            <img className="d-block w-100 hero" src={m.poster} alt={m.title} />
            <Carousel.Caption
              className="cap text-start"
              // NEW: cũng cho phép click ở caption
              onClick={(e) => { e.stopPropagation(); goToMovieCard(m); }}
              role="button"
              tabIndex={0}
              style={{ cursor: "pointer" }}
            >
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
