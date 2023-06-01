import { Link } from "react-router-dom";
import Loading from "./ui/Loading";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const ArticleComments = ({ currentArticleComments, isLoadingComments }) => {
  return (
    <div className="container article-comments" id="comments">
      <h3>Comments</h3>
      {!currentArticleComments.length && (
        <p>No comments for this article yet.</p>
      )}
      {isLoadingComments && <Loading name="Comments for this article..." />}
      {!isLoadingComments && (
        <div className="row">
          {currentArticleComments.map((comment) => {
            return (
              <div
                className="col-xs-12 col-sm-12 col-lg-6 comment-card-container p-2"
                key={comment.comment_id}
              >
                <div className="comment-card row">
                  <div className="col-xs-12 col-sm-10">
                    <p>{comment.body}</p>
                    <p className="comment-attribution">
                      By{" "}
                      <Link to={`/articles?author=${comment.author}`}>
                        {comment.author}
                      </Link>{" "}
                      {dayjs(Date.parse(comment.created_at)).fromNow()}
                    </p>
                  </div>
                  <div className="article-vote-buttons col">
                    <button
                      className="comment-vote-button upvote"
                      title="Click to upvote comment"
                    >
                      ⬆️
                    </button>
                    <button
                      className="comment-vote-button downvote"
                      title="Click to downvote comment"
                    >
                      ⬇️
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ArticleComments;
