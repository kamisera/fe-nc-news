import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <nav>
      <ul className="nav nav-pills">
        <li className="nav-item">
          <NavLink to="/" className="nav-link" aria-current="page">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/articles" className="nav-link">
            Articles
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/topics" className="nav-link">
            Topics
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/users" className="nav-link">
            Users
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
