import { useEffect, useState } from "react";
import { fetchArticles } from "../utils/api";
import { Link, useSearchParams } from "react-router-dom";
import Loading from "./ui/Loading";
import { capitaliseWord } from "../utils/utils";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import ArticleSortOptions from "./ArticleSortOptions";
dayjs.extend(relativeTime);

const Articles = () => {
  const [currentArticles, setCurrentArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTopic = searchParams.get("topic");

  useEffect(() => {
    fetchArticles(searchParams)
      .then((articles) => {
        setCurrentArticles(articles);
        setIsLoading(false);
      })
      .catch((err) => {
        toast.error("Could not load articles! Please try again later.");
      });
  }, [searchParams]);

  return (
    <section className="container">
      <h2 className="mb-4 pb-4">
        {!currentTopic && "Showing all articles"}
        {currentTopic &&
          `Showing articles for "${capitaliseWord(currentTopic)}"`}
      </h2>
      {!isLoading && currentTopic && (
        <Link to="/articles">Show all topics</Link>
      )}
      {!currentArticles && <>No articles</>}
      {isLoading && <Loading name="articles" />}
      {!isLoading && currentArticles.length === 0 && (
        <p className="mt-4">No articles found.</p>
      )}
      {!isLoading && currentArticles.length > 0 && <ArticleSortOptions />}
      {!isLoading && currentArticles.length > 0 && (
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
                      By {article.author} <br />
                      {dayjs(Date.parse(article.created_at)).fromNow()}
                      {" | "}
                      <Link to={`/articles/${article.article_id}#comments`}>
                        {article.comment_count}
                        {article.comment_count === 1 ? " comment" : " comments"}
                      </Link>
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
