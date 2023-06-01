import logo from "../assets/logo.svg";
import Navigation from "./Navigation";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/User";

const Header = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  return (
    <header className="main-header d-flex flex-wrap justify-content-center py-3 mb-3">
      <div className="col-sm-4 col-md-5 col-lg-3">
        <Link
          to="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
          title="Link to NewsHub homepage"
        >
          <img src={logo} className="logo" alt="NewsHub logo showing a globe" />
        </Link>
      </div>
      <div className="main-navigation-container col-sm-6 col-md-5 col-lg-7">
        <Navigation />
      </div>
      <div className="current-user col-sm-12 col-md-2 col-lg-1">
        <span className="logged-in-username-subheader">
          Logged in as @{currentUser.username}
        </span>
        <img
          src={currentUser.avatar_url}
          alt={`Avatar image for user ${currentUser.name}`}
          title={`Currently logged in as ${currentUser.name}`}
        />
        <span className="logged-in-username">@{currentUser.username}</span>
      </div>
    </header>
  );
};

export default Header;
