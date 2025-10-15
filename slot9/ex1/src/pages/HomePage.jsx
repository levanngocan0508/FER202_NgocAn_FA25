// src/pages/HomePage.jsx
import React, { useMemo, useRef, useEffect } from "react";
import HomeCarousel from "../components/Carousel/HomeCarousel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MovieCard from "../components/Movie/MovieCard";
import { movies } from "../data/movies";
import "./HomePage.css";

export default function HomePage({
  externalSearch = "",
  externalYearRange = "all",
  externalSortBy = "year-asc",
}) {
  const gridRef = useRef(null);

  const num = (x) => {
    const n = parseInt(x, 10);
    return Number.isNaN(n) ? 0 : n;
  };
  const durationVal = (d) => {
    if (typeof d === "number") return d;
    if (typeof d === "string") {
      const n = parseInt(d.replace(/[^0-9]/g, ""), 10);
      return Number.isNaN(n) ? 0 : n;
    }
    return 0;
  };

  const visibleMovies = useMemo(() => {
    const q = (externalSearch || "").trim().toLowerCase();
    const yearRange = externalYearRange || "all";
    const sortBy = externalSortBy || "year-asc";

    let list = movies.slice();

    if (q) {
      list = list.filter((m) => {
        const title = (m.title || "").toLowerCase();
        const desc = (m.description || m.desc || "").toLowerCase();
        return title.includes(q) || desc.includes(q);
      });
    }

    list = list.filter((m) => {
      const y = num(m.year);
      if (yearRange === "lte-2000") return y <= 2000;
      if (yearRange === "2001-2015") return y >= 2001 && y <= 2015;
      if (yearRange === "gt-2015") return y > 2015;
      return true;
    });

    list.sort((a, b) => {
      const ya = num(a.year), yb = num(b.year);
      const ta = (a.title || "").toLowerCase();
      const tb = (b.title || "").toLowerCase();
      const da = durationVal(a.duration);
      const db = durationVal(b.duration);
      switch (sortBy) {
        case "year-asc":   return ya - yb || ta.localeCompare(tb);
        case "year-desc":  return yb - ya || ta.localeCompare(tb);
        case "title-asc":  return ta.localeCompare(tb);
        case "title-desc": return tb.localeCompare(ta);
        case "duration-asc":  return da - db || ta.localeCompare(tb);
        case "duration-desc": return db - da || ta.localeCompare(tb);
        default: return 0;
      }
    });

    return list;
  }, [externalSearch, externalYearRange, externalSortBy]);

  // Auto scroll tới thẻ đầu tiên khi thay đổi tham số
  useEffect(() => {
    if (!gridRef.current || !visibleMovies.length) return;
    const t = setTimeout(() => {
      const firstCard = gridRef.current.querySelector(".movie-card");
      firstCard?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 200);
    return () => clearTimeout(t);
  }, [visibleMovies.length, externalSearch, externalYearRange, externalSortBy]);

  return (
    <div className="homepage">
      <HomeCarousel />

      <Container className="mt-4 homepage-section fade-in">
        <h4 className="mb-3 section-title">Featured Movies Collections</h4>

        <Row ref={gridRef} xs={1} md={2} lg={3} className="g-4">
          {visibleMovies.map((m) => (
            <Col key={m.id}>
              <MovieCard movie={m} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
