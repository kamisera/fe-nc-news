import { useState } from "react";
import { postComment } from "../../utils/api";
import { toast } from "react-toastify";

const PostComment = ({ username, articleId, setCurrentArticleComments }) => {
  const [body, setBody] = useState("");
  const [isSendingComment, setIsSendingComment] = useState(false);
  const [hasPostedComment, setHasPostedComment] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSendingComment(true);
    postComment(username, articleId, body)
      .then((postedComment) => {
        setCurrentArticleComments((previousComments) => {
          setBody("");
          setIsSendingComment(false);
          setHasPostedComment(true);
          return [postedComment, ...previousComments];
        });
      })
      .catch((err) => {
        setIsSendingComment(false);
        setHasPostedComment(false);
        toast.error("Could not post comment! Please try again later.");
      });
  };

  const handleChange = (event) => {
    setBody(event.target.value);
  };

  return (
    <div className="row content-justify-end mb-4 mt-4">
      <div className="col">
        <form className="form-group" onSubmit={handleSubmit}>
          <label className="for-label" htmlFor="comment-body">
            Enter your comment here:{" "}
          </label>
          <textarea
            rows="3"
            className="form-control"
            id="comment-body"
            onChange={handleChange}
            value={body}
            required
          />
          <button
            className="btn btn-primary btn-sm m-2"
            disabled={isSendingComment}
          >
            Post Comment
          </button>
          {hasPostedComment && !isSendingComment && (
            <p>Comment posted! Thanks for your contribution!</p>
          )}
          {isSendingComment && <p>Posting comment; please wait...</p>}
        </form>
      </div>
    </div>
  );
};

export default PostComment;
