import { useNavigate, Link } from "react-router-dom";
import { capitaliseWord } from "../utils/utils";
const Article = ({ currentArticle }) => {
  const navigate = useNavigate();
  // <button onClick={() => navigate(-1)}>go back</button>
  return (
    <>
      <article className="row full-article-container">
        <nav>
          <Link
            to="/articles"
            className="go-back-link"
            title="Click here to go back to the articles page."
          >
            Go back
          </Link>
        </nav>
        <section className="col-8">
          <h2>{currentArticle.title}</h2>
          <span class="topic-bubble">
            <Link
              to={`articles?topic=${currentArticle.topic}`}
              title={`Click here to view all articles for ${currentArticle.topic}`}
            >
              {capitaliseWord(currentArticle.topic)}
            </Link>
          </span>
          <p className="article-info author-subheading">
            By{" "}
            <Link
              to={`users/${currentArticle.author}`}
              title="Click here to read about this this author."
            >
              {currentArticle.author}
            </Link>
          </p>
          <p className="article-info">
            <span className="date-label">Date:</span>{" "}
            {new Date(currentArticle.created_at).toLocaleString()}
          </p>
          <p className="article-info">
            <span className="votes-label">Votes:</span> {currentArticle.votes}
          </p>
          <p className="article-info">
            {" "}
            <span className="comments-label">Comments: </span>
            <Link to="#comments">
              {currentArticle.comment_count}
              {currentArticle.comment_count === 1 ? " comment" : " comments"}
            </Link>
          </p>
          <p className="article-body">{currentArticle.body}</p>
        </section>
        <section className="col">
          <div className="article-image-container">
            <img
              className="img-fluid"
              src={currentArticle.article_img_url}
              alt={`A cover representing the article with title: ${currentArticle.title}`}
              title={currentArticle.title}
            />
            <span className="cover-label">
              Source: NewsHub photography team
            </span>
          </div>
        </section>
      </article>
    </>
  );
};

export default Article;
