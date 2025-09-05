import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__brand">
        <h1 className="navbar__title">Movie Time</h1>
        <img src="/assets/popcorn.png" alt="Popcorn" className="navbar__icon" />
      </div>
      <div className="navbar__links">
        <Link to="/">Home</Link>
      </div>
    </nav>
  );
}
