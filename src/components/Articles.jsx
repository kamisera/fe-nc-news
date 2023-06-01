import { Link } from "react-router-dom";
import Loading from "./ui/Loading";
import { capitaliseWord } from "../utils/utils";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const Articles = ({ currentArticles, isLoading }) => {
  return (
    <section className="container">
      {!currentArticles && <>No articles</>}
      {isLoading && <Loading name="articles" />}
      {!isLoading && currentArticles.length && (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          {currentArticles.map((article) => {
            return (
              <article className="col" key={article.article_id}>
                <div className="card shadow-sm article-card">
                  <div
                    className="article-card-votes"
                    title={`People ${
                      article.votes >= 0
                        ? article.votes > 0
                          ? "like"
                          : "have no opinions about"
                        : "dislike"
                    } this article.`}
                  >
                    {article.votes > 0 && (
                      <span className="comment-vote-icon upvoted">
                        🔼 {article.votes}
                      </span>
                    )}
                    {article.votes < 0 && (
                      <span className="comment-vote-icon downvoted">
                        🔽 {article.votes}
                      </span>
                    )}
                    {article.votes === 0 && (
                      <span className="comment-vote-icon">
                        ▶️ {article.votes}
                      </span>
                    )}
                  </div>
                  <div className="article-card-topic">
                    {capitaliseWord(article.topic)}
                  </div>
                  <img
                    src={article.article_img_url}
                    alt={`A cover representing the article with title: ${article.title}`}
                    title={article.title}
                    className="article-cover"
                  />

                  <div className="card-body">
                    <Link
                      to={`/articles/${article.article_id}`}
                      title={article.title}
                    >
                      <p className="card-text">{article.title}</p>
                    </Link>
                    <p>
                      By {article.author} on
                      <br /> {dayjs(Date.parse(article.created_at)).fromNow()}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Articles;
