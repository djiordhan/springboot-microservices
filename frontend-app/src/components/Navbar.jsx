import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">⚡</span>
          <span className="logo-text">Microservices Hub</span>
        </Link>
        
        <ul className="navbar-menu">
          <li>
            <Link to="/" className={`navbar-link ${isActive('/')}`}>
              <span className="nav-icon">🏠</span>
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/users" className={`navbar-link ${isActive('/users')}`}>
              <span className="nav-icon">👥</span>
              Users
            </Link>
          </li>
          <li>
            <Link to="/orders" className={`navbar-link ${isActive('/orders')}`}>
              <span className="nav-icon">📦</span>
              Orders
            </Link>
          </li>
          <li>
            <Link to="/notifications" className={`navbar-link ${isActive('/notifications')}`}>
              <span className="nav-icon">🔔</span>
              Notifications
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
