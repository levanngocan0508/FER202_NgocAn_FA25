export default function Column() {
  return (
    <div className="grid-frame">
      {/* Hàng 1: 6 - 6 */}
      <div className="row g-0 grid-row">
        <div className="col-6 grid-cell">First col</div>
        <div className="col-6 grid-cell">Second col</div>
      </div>

      {/* Hàng 2: 4 - 4 - 4 (chia đều) */}
      <div className="row g-0 grid-row">
        <div className="col-4 grid-cell">col</div>
        <div className="col-4 grid-cell">col</div>
        <div className="col-4 grid-cell">col</div>
      </div>

      {/* Hàng 3: 3 - 3 - 3 - 3 (chia đều) */}
      <div className="row g-0 grid-row">
        <div className="col-3 grid-cell">col</div>
        <div className="col-3 grid-cell">col</div>
        <div className="col-3 grid-cell">col</div>
        <div className="col-3 grid-cell">col</div>
      </div>
    </div>
  );
}
