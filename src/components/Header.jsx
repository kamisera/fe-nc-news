import logo from "../assets/logo.svg";
import Navigation from "./Navigation";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="d-flex flex-wrap justify-content-center py-3 mb-4 p-4 border-bottom">
      <Link
        to="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
        title="Link to NewsHub homepage"
      >
        <img src={logo} className="logo" alt="NewsHub logo showing a globe" />
      </Link>
      <Navigation />
    </header>
  );
};

export default Header;
