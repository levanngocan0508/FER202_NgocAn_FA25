import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import "./MovieCard.css";
import MovieDetailModal from "./MovieDetailModal"; // NEW

export default function MovieCard({ movie }) {
  const [isFav, setIsFav] = useState(false);
  const [showDetail, setShowDetail] = useState(false); // NEW

  // ---- helpers (ID chuẩn hoá string) ----
  const readFavs = () => {
    try {
      const raw = localStorage.getItem("favourites");
      const arr = JSON.parse(raw);
      return Array.isArray(arr) ? arr.map(String) : [];
    } catch {
      return [];
    }
  };
  const writeFavs = (arr) => {
    try {
      const uniq = Array.from(new Set(arr.map(String)));
      localStorage.setItem("favourites", JSON.stringify(uniq));
      return uniq;
    } catch {
      return arr;
    }
  };
  const dispatchFavUpdate = (ids) => {
    try {
      window.dispatchEvent(new CustomEvent("favourites:update", { detail: { ids } }));
    } catch {}
  };
  const dispatchAppToast = (message, variant = "success") => {
    if (typeof window.appToast === "function") {
      window.appToast(message, variant);
      return;
    }
    try {
      window.dispatchEvent(new CustomEvent("app:toast", { detail: { message, variant } }));
    } catch {}
  };

  // init & sync
  useEffect(() => {
    const id = String(movie.id);
    setIsFav(readFavs().includes(id));
    const syncFromLs = () => setIsFav(readFavs().includes(id));

    const onFavUpdate = (e) => {
      const ids = e?.detail?.ids?.map?.(String) || readFavs();
      setIsFav(ids.includes(id));
    };
    const onStorage = (e) => { if (!e || e.key === "favourites") syncFromLs(); };
    const onVisible = () => { if (document.visibilityState === "visible") syncFromLs(); };

    window.addEventListener("favourites:update", onFavUpdate);
    window.addEventListener("storage", onStorage);
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      window.removeEventListener("favourites:update", onFavUpdate);
      window.removeEventListener("storage", onStorage);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [movie.id]);

  const shortDesc =
    movie.description && movie.description.length > 120
      ? movie.description.slice(0, 117) + "..."
      : movie.description;

  function toggleFavourite() {
    const id = String(movie.id);
    let favs = readFavs();
    const idx = favs.indexOf(id);

    if (idx === -1) {
      // ADD
      favs.push(id);
      favs = writeFavs(favs);
      dispatchFavUpdate(favs);
      setIsFav(true);
      dispatchAppToast("Added to favourites.", "success");
    } else {
      // REMOVE
      favs.splice(idx, 1);
      favs = writeFavs(favs);
      dispatchFavUpdate(favs);
      setIsFav(false);
      dispatchAppToast("Removed from favourites.", "secondary");
    }
  }

  function viewDetails() {
    setShowDetail(true); // NEW: mở modal
  }

  return (
    <>
      <Card className="movie-card h-100">
        <Card.Header className="d-flex justify-content-between align-items-center">
          <span className="fw-semibold">{movie.title}</span>
          <Badge bg="dark">{movie.genre}</Badge>
        </Card.Header>

        <Card.Img
          variant="top"
          src={movie.poster}
          alt={`${movie.title} poster`}
          className="poster-img"
        />

        <Card.Body>
          <Card.Text className="text-muted small mb-2">{shortDesc}</Card.Text>
        </Card.Body>

        {/* ListGroup flush theo đúng pattern đặt cạnh Body trong Card */}
        <ListGroup variant="flush" className="small">
          <ListGroup.Item>
            <strong>Year:</strong> {movie.year}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Country:</strong> {movie.country}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Duration:</strong> {movie.duration}’
          </ListGroup.Item>
        </ListGroup>

        <Card.Footer className="bg-white border-0 p-2">
          <div className="d-flex gap-2">
            <Button
              type="button"
              variant={isFav ? "outline-danger" : "primary"}
              size="sm"
              className="flex-fill"
              onClick={toggleFavourite}
              aria-pressed={isFav}
            >
              {isFav ? "Remove from Favourites" : "Add to Favourites"}
            </Button>
            <Button
              type="button"
              variant="outline-primary"
              size="sm"
              className="flex-fill"
              onClick={viewDetails}
            >
              View Details
            </Button>
          </div>
        </Card.Footer>
      </Card>

      {/* Modal chi tiết phim */}
      <MovieDetailModal
        show={showDetail}
        onHide={() => setShowDetail(false)}
        movie={movie}
      />
    </>
  );
}
