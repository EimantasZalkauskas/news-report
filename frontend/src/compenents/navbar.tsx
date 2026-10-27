import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="site-header">
      <NavLink className="brand" to="/" end>
        News
      </NavLink>
      <nav aria-label="Primary navigation" className="site-nav">
        <NavLink className="nav-link" end to="/">
          Home
        </NavLink>
        <NavLink className="nav-link" to="/explore">
          Explore
        </NavLink>
      </nav>
    </header>
  );
}