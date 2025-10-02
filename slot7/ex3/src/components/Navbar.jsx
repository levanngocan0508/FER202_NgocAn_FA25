export default function Navbar() {
  return (
    <nav className="bg-body-tertiary py-2">
      <div className="container">
        <ul className="nav">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="#!">Active</a>
          </li>
          <li className="nav-item"><a className="nav-link" href="#!">Link</a></li>
          <li className="nav-item"><a className="nav-link" href="#!">Link</a></li>
          <li className="nav-item"><span className="nav-link disabled">Disabled</span></li>
        </ul>
      </div>
    </nav>
  );
}
