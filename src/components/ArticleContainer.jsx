import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchArticle, fetchArticleComments } from "../utils/api";
import Loading from "./ui/Loading";
import Article from "./Article";
import ArticleComments from "./ArticleComments";

const ArticleContainer = () => {
  const { article_id: articleId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [currentArticle, setCurrentArticle] = useState({});
  const [currentArticleComments, setCurrentArticleComments] = useState([]);
  const [isLoadingComments, setIsLoadingComments] = useState(true);

  useEffect(() => {
    fetchArticle(articleId)
      .then((article) => {
        setCurrentArticle(article);
        setIsLoading(false);
      })
      .catch((err) => {
        toast.error("Could not load article! Please try again later.");
      });
  }, []);

  useEffect(() => {
    fetchArticleComments(articleId)
      .then((comments) => {
        setCurrentArticleComments(comments);
        setIsLoadingComments(false);
      })
      .catch((err) => {
        toast.error("Could not load article comments! Please try again later.");
      });
  }, []);

  return (
    <>
      {isLoading && <Loading name={`Article #${articleId}`} />}
      {!isLoading && (
        <>
          <Article currentArticle={currentArticle} />
          <ArticleComments
            currentArticleComments={currentArticleComments}
            setCurrentArticleComments={setCurrentArticleComments}
            isLoadingComments={isLoadingComments}
          />
        </>
      )}
    </>
  );
};

export default ArticleContainer;
