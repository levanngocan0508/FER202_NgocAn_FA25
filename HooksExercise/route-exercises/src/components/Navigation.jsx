import { NavLink } from "react-router-dom";

const linkCls = ({ isActive }) => (isActive ? "active" : "");
export default function Navigation() {
  return (
    <nav style={{ display: "flex", gap: 12, padding: 12, borderBottom: "1px solid #eee" }}>
      <NavLink to="/" end className={linkCls}>Home</NavLink>
      <NavLink to="/san-pham" className={linkCls}>Products</NavLink>
      <NavLink to="/lien-he" className={linkCls}>Contact</NavLink>
    </nav>
  );
}
