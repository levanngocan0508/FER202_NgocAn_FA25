export default function Banner() {
  return (
    // Nền full-bleed
    <header className="bg-body-secondary py-5 mb-3">
      {/* Chỉ chữ nằm trong container để canh giữa */}
      <div className="container">
        <h1 className="display-5 fw-semibold mb-0">Let&apos;s test the grid!</h1>
      </div>
    </header>
  );
}
