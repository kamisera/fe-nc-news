import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="main-navigation">
      <ul className="nav nav-pills justify-content-end">
        <li className="nav-item">
          <NavLink to="/" className="nav-link" title="Go home">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/articles"
            className="nav-link"
            title="View all articles"
          >
            Articles
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/topics" className="nav-link" title="View all topics">
            Topics
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/authors" className="nav-link" title="View all authors">
            Authors
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
