import { Link } from "react-router-dom";

const ArticleComments = ({
  currentArticleComments,
  setArticleComments,
  isLoadingComments,
}) => {
  return (
    <div className="row article-comments">
      <h3>Comments</h3>
      {currentArticleComments.map((comment) => {
        return (
          <>
            <div className="col-5 comment-card" key={comment.comment_id}>
              <p>{comment.body}</p>
              <p className="comment-attribution">
                By <Link to={`/users/${comment.author}`}>{comment.author}</Link>{" "}
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
          </>
        );
      })}
    </div>
  );
};

export default ArticleComments;
