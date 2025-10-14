import React from "react";
import { ListGroup } from "react-bootstrap";

/**
 * props:
 *  - query: chuỗi đang gõ
 *  - results: mảng phim [{id, title, description, year, duration, poster?}]
 *  - onSelect: (movie) => void
 */
export default function SearchSuggest({ query = "", results = [], onSelect = () => {} }) {
  if (!query || results.length === 0) return null;

  return (
    <div
      className="dropdown-menu show w-100 p-0 shadow"
      style={{ position: "absolute", inset: "auto 0 0 0", transform: "translateY(0)", top: "100%", zIndex: 1055 }}
    >
      <ListGroup variant="flush">
        {results.map((m) => (
          <ListGroup.Item
            key={m.id}
            action
            className="d-flex align-items-center gap-3"
            onMouseDown={(e) => e.preventDefault()} // để không mất focus input
            onClick={() => onSelect(m)}
          >
            <i className="bi bi-search fs-5 text-secondary" />

            {/* avatar/poster nếu có */}
            {m.poster && (
              <img
                src={m.poster}
                alt={m.title}
                style={{ width: 36, height: 36, objectFit: "cover", borderRadius: 6 }}
              />
            )}

            <div className="flex-grow-1">
              <div className="fw-semibold">{m.title}</div>
              <div className="text-muted small">
                {m.year ? `${m.year}` : ""}{m.duration ? ` • ${m.duration}` : ""}
              </div>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}
