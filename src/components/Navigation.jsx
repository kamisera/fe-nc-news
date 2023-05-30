import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <nav>
      <ul className="nav nav-pills">
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
          <NavLink to="/users" className="nav-link" title="View all users">
            Users
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
