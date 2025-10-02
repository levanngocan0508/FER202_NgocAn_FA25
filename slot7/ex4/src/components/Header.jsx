export default function Header() {
  return (
    <header className="header bg-fpt py-4">
      <div className="container text-center">
        {/* ảnh nằm trong public/images */}
        <img
          src="/images/fpt.png"
          alt="FPT University"
          className="header-logo img-fluid"
          loading="lazy"
        />

        {/* menu giữa, dùng nav của Bootstrap */}
        <ul className="nav justify-content-center mt-3">
          <li className="nav-item"><a className="nav-link text-white" href="#home">Home</a></li>
          <li className="nav-item"><a className="nav-link text-white" href="#about">About</a></li>
          <li className="nav-item"><a className="nav-link text-white" href="#contact">Contact</a></li>
        </ul>
      </div>
    </header>
  );
}
