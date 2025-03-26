import { Link } from "react-router-dom";
import "../css/Navbar.css";

function NavBar() {
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/">lica</Link>
        </div>
        <div className="navbar-links">
          <Link to="/home" className="nav-link">
            Home
          </Link>
          <Link to="/favorites" className="nav-link">
            Favorites
          </Link>
          <Link to="/chat" className="nav-link">
            Chat
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
