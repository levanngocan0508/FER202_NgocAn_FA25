// src/components/Nav/AppNavbar.jsx
import React, { useMemo, useRef, useState, useEffect } from "react";
import {
  Navbar, Nav, Container, Form, Button, InputGroup, NavDropdown,
  Modal, ListGroup, Offcanvas, Image, Alert, Dropdown
} from "react-bootstrap";
import Badge from "react-bootstrap/Badge";
import { movies } from "../../data/movies";
import SearchSuggest from "../Search/SearchSuggest";
import MovieDetailModal from "../Movie/MovieDetailModal";

export default function AppNavbar({
  onQuickSearch = () => {},
  onQuickFilters = () => {}, // NEW: để đẩy filter xuống Home (an toàn nếu chưa dùng)
}) {
  const [q, setQ] = useState("");
  const inputWrapRef = useRef(null);
  const [validated, setValidated] = useState(false);

  // ===== FAVOURITES: badge + helpers =====
  const readFavs = () => {
    try {
      const raw = localStorage.getItem("favourites");
      const arr = JSON.parse(raw);
      return Array.isArray(arr) ? arr.map(String) : [];
    } catch { return []; }
  };
  const writeFavs = (ids) => {
    try { localStorage.setItem("favourites", JSON.stringify(ids)); } catch {}
  };
  const dispatchFavUpdate = (ids) => {
    try { window.dispatchEvent(new CustomEvent("favourites:update", { detail: { ids } })); } catch {}
  };

  const [favCount, setFavCount] = useState(0);
  const updateFavCount = () => setFavCount(readFavs().length);

  useEffect(() => {
    updateFavCount();
    const onStorage    = (e) => { if (!e || e.key === "favourites") updateFavCount(); };
    const onVisible    = () => { if (document.visibilityState === "visible") updateFavCount(); };
    const onFavUpdate  = (e) => { e?.detail?.ids ? setFavCount(e.detail.ids.length) : updateFavCount(); };
    window.addEventListener("storage", onStorage);
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("favourites:update", onFavUpdate);
    return () => {
      window.removeEventListener("storage", onStorage);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("favourites:update", onFavUpdate);
    };
  }, []);

  // ===== Quick search =====
  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return [];
    const norm = (t) => (t || "").toString().toLowerCase();
    return movies
      .filter((m) => norm(m.title).startsWith(s))
      .sort((a, b) => norm(a.title).localeCompare(norm(b.title)))
      .slice(0, 8);
  }, [q]);

  // ===== Filters ngay trong Search (NEW) =====
  const [yearRange, setYearRange] = useState("all");
  const [sortBy, setSortBy] = useState("year-asc");

  const applyFilters = (yr, sb) => {
    onQuickFilters(yr, sb);
    // trigger lọc Home ngay cả khi q đang trống (không phá vỡ gì)
    onQuickSearch(q);
    document.getElementById("home")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidated(true);
    if (!q.trim()) return;
    onQuickSearch(q);
    onQuickFilters(yearRange, sortBy); // NEW: đẩy filter hiện tại
    document.getElementById("home")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSelect = (movie) => {
    const title = movie.title;
    setQ(title);
    onQuickSearch(title);
    onQuickFilters(yearRange, sortBy); // NEW
    document.getElementById("home")?.scrollIntoView({ behavior: "smooth" });
  };

  // ===== Manage Profiles (summary modal) =====
  const [showProfile, setShowProfile] = useState(false);
  const profile = (() => {
    try { return JSON.parse(localStorage.getItem("profile") || "null"); } catch { return null; }
  })();

  // ===== Change Password (NO old password) =====
  const [showPwd, setShowPwd] = useState(false);
  const [pwdValidated, setPwdValidated] = useState(false);
  const [pwdForm, setPwdForm] = useState({ newPwd: "", confirm: "" });
  const submitChangePwd = (e) => {
    e.preventDefault();
    setPwdValidated(true);
    if (!pwdForm.newPwd || pwdForm.newPwd.length < 6) return;
    if (pwdForm.newPwd !== pwdForm.confirm) return;
    try {
      localStorage.setItem("auth", JSON.stringify({
        username: profile?.account?.username || "user",
        password: pwdForm.newPwd
      }));
      if (typeof window.appToast === "function") window.appToast("Đã cập nhật mật khẩu.", "success");
      else window.dispatchEvent(new CustomEvent("app:toast", { detail: { message: "Đã cập nhật mật khẩu.", variant: "success" } }));
    } catch {}
    setShowPwd(false);
    setPwdForm({ newPwd: "", confirm: "" });
    setPwdValidated(false);
  };

  // ===== FAVOURITES Offcanvas (list of cards) — GIỮ NGUYÊN =====
  const [showFav, setShowFav] = useState(false);
  const [favIds, setFavIds] = useState([]);

  const syncFavIds = () => setFavIds(readFavs());

  useEffect(() => {
    syncFavIds();
    const onFavUpdate = (e) => setFavIds(e?.detail?.ids?.map?.(String) ?? readFavs());
    const onStorage   = (e) => { if (!e || e.key === "favourites") syncFavIds(); };
    const onVisible   = () => { if (document.visibilityState === "visible") syncFavIds(); };
    window.addEventListener("favourites:update", onFavUpdate);
    window.addEventListener("storage", onStorage);
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      window.removeEventListener("favourites:update", onFavUpdate);
      window.removeEventListener("storage", onStorage);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  const favMovies = useMemo(() => {
    if (!favIds.length) return [];
    const set = new Set(favIds);
    return movies.filter((m) => set.has(String(m.id)));
  }, [favIds]);

  const removeFav = (id) => {
    const ids = readFavs().filter((x) => x !== String(id));
    writeFavs(ids);
    dispatchFavUpdate(ids);
    setFavIds(ids);
    setFavCount(ids.length);
    try {
      if (typeof window.appToast === "function") window.appToast("Removed from favourites.", "secondary");
      else window.dispatchEvent(new CustomEvent("app:toast", { detail: { message: "Removed from favourites.", variant: "secondary" } }));
    } catch {}
  };

  // modal chi tiết từ offcanvas
  const [detailMovie, setDetailMovie] = useState(null);

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">CGV</Navbar.Brand>
          <Navbar.Toggle aria-controls="main-navbar" />
          <Navbar.Collapse id="main-navbar">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#about">About</Nav.Link>
              <Nav.Link href="#contact">Contact</Nav.Link>
            </Nav>

            {/* Quick search + Filters (NEW) */}
            <Form className="d-flex gap-2 ms-auto" onSubmit={handleSubmit} role="search" noValidate validated={validated}>
              <div className="position-relative" ref={inputWrapRef} id="qs-suggest-wrap" style={{ minWidth: 280 }}>
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

              {/* Dropdown Filters (giữ mọi thứ trong navbar) */}
              <Dropdown align="end">
                <Dropdown.Toggle variant="outline-light">
                  <i className="bi bi-funnel"></i> Filters
                </Dropdown.Toggle>
                <Dropdown.Menu className="p-3" style={{ minWidth: 260 }}>
                  <Form.Group className="mb-3" controlId="filterYear">
                    <Form.Label className="small mb-1">Year</Form.Label>
                    <Form.Select
                      value={yearRange}
                      onChange={(e) => {
                        const v = e.target.value;
                        setYearRange(v);
                        applyFilters(v, sortBy);
                      }}
                    >
                      <option value="all">All</option>
                      <option value="lte-2000">≤ 2000</option>
                      <option value="2001-2015">2001–2015</option>
                      <option value="gt-2015">&gt; 2015</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group controlId="filterSort">
                    <Form.Label className="small mb-1">Sort by</Form.Label>
                    <Form.Select
                      value={sortBy}
                      onChange={(e) => {
                        const v = e.target.value;
                        setSortBy(v);
                        applyFilters(yearRange, v);
                      }}
                    >
                      <option value="year-asc">Year ↑</option>
                      <option value="year-desc">Year ↓</option>
                      <option value="title-asc">Title A→Z</option>
                      <option value="title-desc">Title Z→A</option>
                      <option value="duration-asc">Duration ↑</option>
                      <option value="duration-desc">Duration ↓</option>
                    </Form.Select>
                  </Form.Group>
                </Dropdown.Menu>
              </Dropdown>
            </Form>

            {/* Accounts & Favourites (GIỮ NGUYÊN) */}
            <Nav className="align-items-center ms-2">
              <NavDropdown
                id="accounts-dd"
                align="end"
                title={<span><i className="bi bi-person-circle me-1"></i>Accounts</span>}
              >
                <NavDropdown.Item as="button" onClick={() => setShowProfile(true)}>
                  Manage Your Profiles
                </NavDropdown.Item>
                <NavDropdown.Item href="#account">Build your Account</NavDropdown.Item>
                <NavDropdown.Item as="button" onClick={() => setShowPwd(true)}>
                  Change Password
                </NavDropdown.Item>
              </NavDropdown>

              <Nav.Link
                className="ms-1 position-relative"
                onClick={() => setShowFav(true)}
                role="button"
                aria-label={`Favourites (${favCount})`}
              >
                <i className="bi bi-heart"></i> Favourites
                <Badge bg="danger" pill className="ms-1 align-middle">{favCount}</Badge>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* ===== Manage Profile Modal ===== */}
      <Modal show={showProfile} onHide={() => setShowProfile(false)} centered>
        <Modal.Header closeButton className="bg-light">
          <Modal.Title>Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {profile ? (
            <>
              <h6 className="mb-2">About</h6>
              <ListGroup variant="flush" className="mb-3 small">
                <ListGroup.Item><strong>Name:</strong> {profile.about?.firstName} {profile.about?.lastName}</ListGroup.Item>
                <ListGroup.Item><strong>Email:</strong> {profile.about?.email}</ListGroup.Item>
                <ListGroup.Item><strong>Phone:</strong> {profile.about?.phone || "—"}</ListGroup.Item>
                <ListGroup.Item><strong>Age:</strong> {profile.about?.age || "—"}</ListGroup.Item>
              </ListGroup>
              <h6 className="mb-2">Account</h6>
              <ListGroup variant="flush" className="mb-3 small">
                <ListGroup.Item><strong>Username:</strong> {profile.account?.username || "—"}</ListGroup.Item>
              </ListGroup>
              <h6 className="mb-2">Address</h6>
              <ListGroup variant="flush" className="small">
                <ListGroup.Item><strong>Country:</strong> {profile.address?.country || "—"}</ListGroup.Item>
                <ListGroup.Item><strong>City:</strong> {profile.address?.city || "—"}</ListGroup.Item>
                <ListGroup.Item><strong>Address 1:</strong> {profile.address?.line1 || "—"}</ListGroup.Item>
                <ListGroup.Item><strong>Address 2:</strong> {profile.address?.line2 || "—"}</ListGroup.Item>
                <ListGroup.Item><strong>ZIP:</strong> {profile.address?.zip || "—"}</ListGroup.Item>
              </ListGroup>
            </>
          ) : (
            <div className="text-muted">
              Chưa có thông tin hồ sơ. Hãy chọn <strong>Build your Account</strong> để tạo hồ sơ.
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowProfile(false)}>Close</Button>
          {!profile && (
            <Button onClick={() => { setShowProfile(false); document.getElementById("account")?.scrollIntoView({behavior:"smooth"}); }}>
              Build your Account
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      {/* ===== Change Password Modal ===== */}
      <Modal show={showPwd} onHide={() => setShowPwd(false)} centered>
        <Form noValidate validated={pwdValidated} onSubmit={submitChangePwd}>
          <Modal.Header closeButton className="bg-light">
            <Modal.Title>Change Password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="newPwd">
              <Form.Label>New password</Form.Label>
              <Form.Control
                type="password"
                required
                minLength={6}
                placeholder="Tối thiểu 6 ký tự"
                value={pwdForm.newPwd}
                onChange={(e) => setPwdForm((s) => ({ ...s, newPwd: e.target.value }))}
              />
              <Form.Control.Feedback type="invalid">
                Vui lòng nhập mật khẩu mới (≥ 6 ký tự).
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="confirmPwd">
              <Form.Label>Confirm new password</Form.Label>
              <Form.Control
                type="password"
                required
                isInvalid={pwdValidated && pwdForm.confirm !== pwdForm.newPwd}
                placeholder="Nhập lại mật khẩu"
                value={pwdForm.confirm}
                onChange={(e) => setPwdForm((s) => ({ ...s, confirm: e.target.value }))}
              />
              <Form.Control.Feedback type="invalid">
                Mật khẩu nhập lại chưa khớp.
              </Form.Control.Feedback>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" type="button" onClick={() => setShowPwd(false)}>Cancel</Button>
            <Button type="submit">Update</Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* ===== FAVOURITES Offcanvas (list) ===== */}
      <Offcanvas placement="end" show={showFav} onHide={() => setShowFav(false)}>
        <Offcanvas.Header closeButton className="bg-light">
          <Offcanvas.Title className="d-flex align-items-center gap-2">
            <i className="bi bi-heart-fill text-danger" /> Your Favourites
            <span className="text-muted fs-6">({favMovies.length})</span>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {favMovies.length === 0 ? (
            <Alert variant="light" className="text-muted mb-0">
              Chưa có phim nào trong danh sách yêu thích. 
            </Alert>
          ) : (
            <ListGroup variant="flush">
              {favMovies.map((m) => (
                <ListGroup.Item key={m.id} className="py-3">
                  <div className="d-flex">
                    <Image
                      src={m.poster}
                      alt={`${m.title} poster`}
                      rounded
                      width={64}
                      height={96}
                      style={{ objectFit: "cover" }}
                    />
                    <div className="ms-3 flex-fill">
                      <div className="d-flex justify-content-between">
                        <strong>{m.title}</strong>
                        {m.genre ? <Badge bg="dark">{m.genre}</Badge> : null}
                      </div>
                      <div className="text-muted small mt-1">
                        Year: {m.year} • Duration: {m.duration}’ • Country: {m.country}
                      </div>
                      <div className="mt-2 d-flex gap-2">
                        <Button
                          size="sm"
                          variant="outline-primary"
                          onClick={() => setDetailMovie(m)}
                        >
                          View
                        </Button>
                        <Button
                          size="sm"
                          variant="outline-danger"
                          onClick={() => removeFav(m.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Offcanvas.Body>
      </Offcanvas>

      {/* Modal chi tiết khi bấm View trong Favourites */}
      <MovieDetailModal
        show={!!detailMovie}
        onHide={() => setDetailMovie(null)}
        movie={detailMovie}
      />
    </>
  );
}
