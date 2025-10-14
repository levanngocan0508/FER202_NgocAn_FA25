// src/components/Nav/AppNavbar.jsx
import React, { useMemo, useRef, useState, useEffect } from "react";
import {
  Navbar, Nav, Container, Form, Button, InputGroup, NavDropdown
} from "react-bootstrap";
import Badge from "react-bootstrap/Badge";
import { movies } from "../../data/movies";
import SearchSuggest from "../Search/SearchSuggest";

export default function AppNavbar({ onQuickSearch = () => {} }) {
  const [q, setQ] = useState("");
  const inputWrapRef = useRef(null);

  const [validated, setValidated] = useState(false);

  // == FAVOURITES badge ==
  const [favCount, setFavCount] = useState(0);
  const readFavs = () => {
    try {
      const raw = localStorage.getItem("favourites");
      const arr = JSON.parse(raw);
      return Array.isArray(arr) ? arr : [];
    } catch {
      return [];
    }
  };

  useEffect(() => {
    const update = () => setFavCount(readFavs().length);
    update();

    const onStorage = (e) => { if (!e || e.key === "favourites") update(); };
    window.addEventListener("storage", onStorage);

    const onVisible = () => { if (document.visibilityState === "visible") update(); };
    document.addEventListener("visibilitychange", onVisible);

    const onFavUpdate = (e) => {
      if (e?.detail?.ids) setFavCount(e.detail.ids.length);
      else update();
    };
    window.addEventListener("favourites:update", onFavUpdate);

    return () => {
      window.removeEventListener("storage", onStorage);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("favourites:update", onFavUpdate);
    };
  }, []);

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return [];
    const norm = (t) => (t || "").toString().toLowerCase();
    return movies
      .filter((m) => norm(m.title).startsWith(s))
      .sort((a, b) => norm(a.title).localeCompare(norm(b.title)))
      .slice(0, 8);
  }, [q]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidated(true);
    if (!q.trim()) return;
    onQuickSearch(q);
    const el = document.getElementById("home");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleSelect = (movie) => {
    setQ(movie.title);
    onQuickSearch(movie.title);
    const el = document.getElementById("home");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">CGV</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          {/* Left nav */}
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#contact">Contact</Nav.Link>
          </Nav>

          {/* Quick search (Form đứng riêng, theo docs) */}
          <Form
            className="d-flex gap-2 ms-auto"
            onSubmit={handleSubmit}
            role="search"
            noValidate
            validated={validated}
          >
            <div
              className="position-relative"
              ref={inputWrapRef}
              id="qs-suggest-wrap"
              style={{ minWidth: 280 }}
            >
              <InputGroup hasValidation>
                <InputGroup.Text id="quick-search">
                  <i className="bi bi-search" />
                </InputGroup.Text>
                <Form.Control
                  type="search"
                  inputMode="search"
                  name="q"
                  autoComplete="off"
                  spellCheck={false}
                  autoCapitalize="none"
                  placeholder="Quick search"
                  aria-label="Quick search"
                  aria-describedby="quick-search"
                  aria-controls="qs-suggest-wrap"
                  aria-expanded={!!q && results.length > 0}
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  onBlur={() => setTimeout(() => setQ((s) => s), 100)}
                  required
                  isInvalid={validated && !q.trim()}
                />
                <Form.Control.Feedback type="invalid">
                  Vui lòng nhập từ khoá tìm kiếm.
                </Form.Control.Feedback>
              </InputGroup>

              <SearchSuggest query={q} results={results} onSelect={handleSelect} />

              <div className="visually-hidden" aria-live="polite">
                {q && results.length > 0 ? `${results.length} suggestions available` : ""}
              </div>
            </div>

            <Button variant="outline-light" type="submit" disabled={!q.trim()}>
              Search
            </Button>
          </Form>

          {/* Accounts / Login / Favourites (đặt riêng theo chuẩn) */}
          <Nav className="align-items-center ms-2">
            <NavDropdown
              id="accounts-dd"
              align="end"
              title={<span><i className="bi bi-person-circle me-1"></i>Accounts</span>}
            >
              <NavDropdown.Item href="#account">Manage Your Profiles</NavDropdown.Item>
              <NavDropdown.Item href="#account">Build your Account</NavDropdown.Item>
              <NavDropdown.Item href="#account">Change Password</NavDropdown.Item>
            </NavDropdown>

            <Nav.Link href="#login" className="ms-1">
              <i className="bi bi-box-arrow-in-right"></i> Login
            </Nav.Link>

            <Nav.Link
              href="#favourites"
              className="ms-1 position-relative"
              aria-label={`Favourites (${favCount})`}
            >
              <i className="bi bi-heart"></i> Favourites
              <Badge bg="danger" pill className="ms-1 align-middle">{favCount}</Badge>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
