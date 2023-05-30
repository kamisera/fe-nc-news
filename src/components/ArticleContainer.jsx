import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchArticle } from "../utils/api";
import Loading from "./ui/Loading";
import Article from "./Article";

const ArticleContainer = () => {
  const { article_id: articleId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [currentArticle, setCurrentArticle] = useState({});

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

  return (
    <>
      {isLoading && <Loading name={`Article #${articleId}`} />}
      {!isLoading && <Article currentArticle={currentArticle} />}
    </>
  );
};

export default ArticleContainer;
