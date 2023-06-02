import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  fetchArticle,
  fetchArticleComments,
  deleteComment,
} from "../utils/api";
import Loading from "./ui/Loading";
import Article from "./Article";
import ArticleComments from "./ArticleComments";
import PostComment from "./PostComment";
import { UserContext } from "../contexts/User";
import PageNotFound from "./PageNotFound";

const ArticleContainer = () => {
  const { article_id: articleId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [currentArticle, setCurrentArticle] = useState({});
  const [currentArticleComments, setCurrentArticleComments] = useState([]);
  const [isLoadingComments, setIsLoadingComments] = useState(true);
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [articleNotFound, setArticleNotFound] = useState(false);
  const [deletedComment, setDeletedComment] = useState(null);

  useEffect(() => {
    fetchArticle(articleId)
      .then((article) => {
        setCurrentArticle(article);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        if (err.status === 404) {
          setArticleNotFound(true);
        } else {
          toast.error("Could not load article! Please try again later.");
        }
      });
  }, []);

  useEffect(() => {
    if (Object.keys(currentArticle).length) {
      fetchArticleComments(articleId)
        .then((comments) => {
          setCurrentArticleComments(comments);
          setIsLoadingComments(false);
        })
        .catch((err) => {
          toast.error(
            "Could not load article comments! Please try again later."
          );
        });
    }
  }, [currentArticle]);

  const handleCommentDelete = (commentId) => {
    const answer = confirm("Are you sure you want to delete this comment?");
    if (answer) {
      setCurrentArticleComments((prevComments) => {
        return prevComments.filter((comment, index) => {
          if (comment.comment_id === commentId) {
            setDeletedComment({ index, comment });
          }
          return comment.comment_id !== commentId;
        });
      });
    }
  };

  useEffect(() => {
    if (deletedComment) {
      deleteComment(deletedComment.comment.comment_id)
        .then(() => {
          toast.success("Comment successfully deleted.");
        })
        .catch((err) => {
          toast.error(
            "Oops! Could not delete comment. Please try again later."
          );
          setCurrentArticleComments((prevComments) => {
            const newComments = [...prevComments];
            newComments.splice(deletedComment.index, 0, deletedComment.comment);
            setDeletedComment(null);
            return newComments;
          });
        });
    }
  }, [deletedComment]);

  return (
    <>
      {isLoading && <Loading name={`Article...`} />}
      {articleNotFound && <PageNotFound category="article" />}
      {!isLoading && Object.keys(currentArticle).length > 0 && (
        <>
          <Article
            currentArticle={currentArticle}
            currentArticleComments={currentArticleComments}
          />
          <h3 className="m-4 p-4" id="comments">
            Comments
          </h3>
          <PostComment
            username={currentUser.username}
            articleId={currentArticle.article_id}
            setCurrentArticleComments={setCurrentArticleComments}
          />
          <ArticleComments
            currentArticleComments={currentArticleComments}
            setCurrentArticleComments={setCurrentArticleComments}
            isLoadingComments={isLoadingComments}
            handleCommentDelete={handleCommentDelete}
          />
        </>
      )}
    </>
  );
};

export default ArticleContainer;
