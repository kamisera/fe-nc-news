import { Link } from "react-router-dom";
import Loading from "./ui/Loading";

const Articles = ({ currentArticles, isLoading }) => {
  return (
    <section className="container">
      {isLoading && <Loading name="articles" />}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {currentArticles.map((article) => {
          return (
            <div className="col" key={article.article_id}>
              <div className="card shadow-sm article-card">
                <div className="article-card-votes">{article.votes}</div>
                <img
                  src={article.article_img_url}
                  alt={`A cover representing the article with title: ${article.title}`}
                  title={article.title}
                />

                <div className="card-body">
                  <Link
                    to={`/articles/${article.article_id}`}
                    title={article.title}
                  >
                    <p className="card-text">{article.title}</p>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Articles;