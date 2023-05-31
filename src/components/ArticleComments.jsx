import { Link } from "react-router-dom";
import { Fragment } from "react";
import Loading from "./ui/Loading";

const ArticleComments = ({
  currentArticleComments,
  setArticleComments,
  isLoadingComments,
}) => {
  return (
    <div className="row article-comments">
      <h3>Comments</h3>
      {isLoadingComments && <Loading name="Comments for this article..." />}
      {!isLoadingComments &&
        currentArticleComments.map((comment) => {
          return (
            <Fragment key={comment.comment_id}>
              <div className="col-5 comment-card">
                <p>{comment.body}</p>
                <p className="comment-attribution">
                  By{" "}
                  <Link to={`/users/${comment.author}`}>{comment.author}</Link>{" "}
                  on {new Date(comment.created_at).toLocaleString()}
                </p>
              </div>
              <div className="col-1">
                <button
                  className="comment-vote-button"
                  title="Click to upvote comment"
                >
                  👍
                </button>
                <button
                  className="comment-vote-button"
                  title="Click to downvote comment"
                >
                  👎
                </button>
              </div>
            </Fragment>
          );
        })}
    </div>
  );
};

export default ArticleComments;
