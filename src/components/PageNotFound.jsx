import { Link } from "react-router-dom";

const PageNotFound = ({ category }) => {
  return (
    <>
      <h2 className="mb-4 pb-4">
        <span className="pb-4 mb-4 border-bottom">⚠️ OOPS ⚠️</span>
      </h2>
      <p>The requested {category ?? "page"} could not be found!</p>
      <p>
        Click <Link to="/">here</Link> to go back to the homepage.
      </p>
    </>
  );
};

export default PageNotFound;
