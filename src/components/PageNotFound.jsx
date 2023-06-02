import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <>
      <h2>⚠️ OOPS ⚠️</h2>
      <p>The page you requested could not be found!</p>
      <p>
        Click <Link to="/">here</Link> to go back to the homepage.
      </p>
    </>
  );
};

export default PageNotFound;
