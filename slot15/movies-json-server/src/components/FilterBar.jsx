import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";

/**
 * Props:
 * - genres: []            // mảng thể loại từ MovieContext
 * - onApply: (params) =>  // gọi khi nhấn "Áp dụng" -> fetchMoviesWithParams(params)
 * - onReset: () =>        // gọi khi nhấn "Reset" -> fetchMovies()
 */
const FilterBar = ({ genres = [], onApply, onReset }) => {
  const [q, setQ] = useState("");
  const [genreId, setGenreId] = useState("");
  const [minDur, setMinDur] = useState("");
  const [maxDur, setMaxDur] = useState("");
  const [order, setOrder] = useState(""); // "", "asc", "desc"

  const handleApply = (e) => {
    e.preventDefault();
    const params = {};
    if (q.trim()) params.q = q.trim();                  // full-text search
    if (genreId) params.genreId = Number(genreId);      // lọc thể loại
    if (minDur) params["duration_gte"] = Number(minDur);
    if (maxDur) params["duration_lte"] = Number(maxDur);
    if (order) { params._sort = "title"; params._order = order; } // sắp xếp theo tên
    onApply?.(params);
  };

  const handleReset = () => {
    setQ(""); setGenreId(""); setMinDur(""); setMaxDur(""); setOrder("");
    onReset?.();
  };

  return (
    <Form onSubmit={handleApply} className="p-3 border rounded bg-light">
      <Row className="g-2">
        <Col md={4}>
          <Form.Control
            placeholder="Tìm theo tên phim..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </Col>

        <Col md={3}>
          <Form.Select value={genreId} onChange={(e) => setGenreId(e.target.value)}>
            <option value="">-- Thể loại --</option>
            {genres.map((g) => (
              <option key={g.id} value={g.id}>{g.name}</option>
            ))}
          </Form.Select>
        </Col>

        <Col md={3}>
          <div className="d-flex gap-2">
            <Form.Control
              type="number"
              min="1"
              placeholder="Min phút"
              value={minDur}
              onChange={(e) => setMinDur(e.target.value)}
            />
            <Form.Control
              type="number"
              min="1"
              placeholder="Max phút"
              value={maxDur}
              onChange={(e) => setMaxDur(e.target.value)}
            />
          </div>
        </Col>

        <Col md={2}>
          <Form.Select value={order} onChange={(e) => setOrder(e.target.value)}>
            <option value="">Mặc định</option>
            <option value="asc">Tên A → Z</option>
            <option value="desc">Tên Z → A</option>
          </Form.Select>
        </Col>
      </Row>

      <div className="mt-3 d-flex gap-2">
        <Button type="submit" variant="primary">Áp dụng</Button>
        <Button type="button" variant="outline-secondary" onClick={handleReset}>Reset</Button>
      </div>
    </Form>
  );
};

export default FilterBar;
