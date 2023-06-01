import { useEffect, useState } from "react";
import { fetchUsers } from "../utils/api";
import { toast } from "react-toastify";
import Loading from "./ui/Loading";
import { Link } from "react-router-dom";

const Authors = ({ authors }) => {
  const [currentAuthors, setCurrentAuthors] = useState([]);
  const [isLoadingAuthors, setIsLoadingAuthors] = useState(true);
  useEffect(() => {
    fetchUsers()
      .then((authors) => {
        setCurrentAuthors(authors);
        setIsLoadingAuthors(false);
      })
      .catch((err) => {
        toast.error(`Could not load authors! Please try again later.`);
      });
  }, []);
  return (
    <section className="container">
      {isLoadingAuthors && <Loading name="authors"></Loading>}
      {currentAuthors?.length <= 0 && !isLoadingAuthors && (
        <p>No authors found!</p>
      )}
      {currentAuthors?.length > 0 && (
        <>
          <div className="row authors-container">
            <h2>Authors</h2>
          </div>
          <div className="row">
            {currentAuthors.map((currentAuthor) => {
              return (
                <div className="col" key={currentAuthor.username}>
                  <Link
                    to={`/articles?user=${currentAuthor.username}`}
                    title={`Click here to view articles by ${currentAuthor.name}`}
                  >
                    <img
                      src={currentAuthor.avatar_url}
                      className="author-avatar"
                      alt={`Avatar image for user ${currentAuthor.name}`}
                      title={`Avatar image for user ${currentAuthor.name}`}
                    />
                  </Link>
                  <p>
                    {currentAuthor.name}
                    <br />
                    <Link
                      to={`/articles?user=${currentAuthor.username}`}
                      title={`Click here to view articles by ${currentAuthor.name}`}
                    >
                      @{currentAuthor.username}
                    </Link>
                  </p>
                </div>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
};

export default Authors;
