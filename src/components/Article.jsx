import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { capitaliseWord } from "../utils/utils";
import { voteOnArticle } from "../utils/api";
import { toast } from "react-toastify";
const Article = ({ currentArticle }) => {
  const [currentVotes, setCurrentVotes] = useState(currentArticle.votes);
  const [votedAmount, setVotedAmount] = useState(0);
  const [resetVote, setResetVote] = useState(false);

  const handleVoteChange = (clickedAmount) => {
    setVotedAmount((prevVotedAmount) => {
      if (prevVotedAmount === 0) {
        setCurrentVotes((previousVotes) => previousVotes + clickedAmount);
      }

      if (prevVotedAmount === clickedAmount) {
        setResetVote(true);
      }

      if (prevVotedAmount !== clickedAmount && prevVotedAmount !== 0) {
        setCurrentVotes((previousVotes) => previousVotes + clickedAmount * 2);
        return clickedAmount * 2;
      }

      return clickedAmount;
    });
  };

  useEffect(() => {
    if (votedAmount !== 0) {
      voteOnArticle(currentArticle.article_id, votedAmount).catch((err) => {
        toast.error(`Could not vote on article. Please try again later.`);
        setVotedAmount(0);
        setCurrentVotes((previousVotes) => previousVotes - votedAmount);
      });
    }
  }, [votedAmount]);

  useEffect(() => {
    const cachedVotedAmount = votedAmount;
    if (resetVote && votedAmount !== 0) {
      setResetVote(false);
      setCurrentVotes((previousVotes) => previousVotes + -votedAmount);
      setVotedAmount(0);
      voteOnArticle(currentArticle.article_id, -votedAmount).catch((err) => {
        setCurrentVotes((previousVotes) => previousVotes + votedAmount);
        setVotedAmount(cachedVotedAmount);
        toast.error(`Could not undo your vote. Please try again later.`);
      });
    }
  }, [resetVote]);

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
        <section className="col-xs-12 col-s-12 col-md-12 col-lg-8">
          <h2>{currentArticle.title}</h2>
          <span className="topic-bubble">
            <Link
              to={`/articles?topic=${currentArticle.topic}`}
              title={`Click here to view all articles for ${currentArticle.topic}`}
            >
              {capitaliseWord(currentArticle.topic)}
            </Link>
          </span>
          <p className="article-info author-subheading">
            By{" "}
            <Link
              to={`/articles?author=${currentArticle.author}`}
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
            {" "}
            <span className="comments-label">Comments: </span>
            <a href="#comments">
              {currentArticle.comment_count}
              {currentArticle.comment_count === 1 ? " comment" : " comments"}
            </a>
          </p>
          <p className="article-info">
            <span className="votes-label">Votes:</span> {currentVotes}
          </p>
          <div className="article-vote-buttons">
            <button
              className={`comment-vote-button upvote ${
                votedAmount === 1 ? "casted" : ""
              }`}
              title={
                votedAmount === -1
                  ? `Click to upvote comment`
                  : `You upvoted this article.`
              }
              onClick={() => handleVoteChange(1)}
            >
              ⬆️
            </button>
            <button
              className={`comment-vote-button downvote ${
                votedAmount < 0 ? "casted" : ""
              }`}
              title={
                votedAmount > 0
                  ? `Click to downvote comment`
                  : `You upvoted this article.`
              }
              onClick={() => handleVoteChange(-1)}
            >
              ⬇️
            </button>
            {!!Math.abs(votedAmount) && (
              <p className="vote-confirmation">Thanks for voting!</p>
            )}
          </div>
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
