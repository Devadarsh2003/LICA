import { Link } from "react-router-dom";
import "../css/Navbar.css";

function NavBar() {
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/">LiCA</Link>
        </div>
        <div className="navbar-links">
          <Link to="/home" className="nav-link">
            Search
          </Link>
          <Link to="/favorites" className="nav-link">
            Favorites
          </Link>
          <Link to="/chat" className="nav-link">
            Chat
          </Link>
          <Link to="/about" className="nav-link">
            About Us
          </Link>
          <Link to="/" className="nav-link">
            Log Out 
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
