// src/pages/HomePage.jsx
import React, { useMemo, useState } from "react"; // NEW
import HomeCarousel from "../components/Carousel/HomeCarousel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MovieCard from "../components/Movie/MovieCard";
import { movies } from "../data/movies";
import "./HomePage.css";

// NEW
import FilterCard from "../components/Filter/FilterCard";

export default function HomePage() {
  // NEW: state cho filter (UI-controlled)
  const [search, setSearch] = useState("");
  const [yearRange, setYearRange] = useState("all");
  const [sortBy, setSortBy] = useState("year-asc");

  // NEW: helpers an toàn dữ liệu
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

  // NEW: lọc + sắp xếp theo yêu cầu
  const visibleMovies = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = movies.slice();

    // Search (title + description)
    if (q) {
      list = list.filter((m) => {
        const title = (m.title || "").toLowerCase();
        const desc = (m.description || m.desc || "").toLowerCase();
        return title.includes(q) || desc.includes(q);
      });
    }

    // Year filter
    list = list.filter((m) => {
      const y = num(m.year);
      if (yearRange === "lte-2000") return y <= 2000;
      if (yearRange === "2001-2015") return y >= 2001 && y <= 2015;
      if (yearRange === "gt-2015") return y > 2015;
      return true; // all
    });

    // Sorting
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
  }, [search, yearRange, sortBy]);

  return (
    <div className="homepage">
      <HomeCarousel />

      <Container className="mt-4 homepage-section fade-in">
        {/* NEW: Filter UI */}
        <FilterCard
          search={search}
          yearRange={yearRange}
          sortBy={sortBy}
          onSearchChange={setSearch}
          onYearRangeChange={setYearRange}
          onSortChange={setSortBy}
        />

        <h4 className="mb-3 section-title">Featured Movies Collections</h4>

        {/* Grid responsive: xs=1, md=2, lg=3 cột */}
        <Row xs={1} md={2} lg={3} className="g-4">
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
