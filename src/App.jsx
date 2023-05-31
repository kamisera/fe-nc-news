import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import { useEffect, useState } from "react";
import { fetchArticles } from "./utils/api";
import Header from "./components/Header";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Articles from "./components/Articles";
import Home from "./components/Home";
import ArticleContainer from "./components/ArticleContainer";
import { toast } from "react-toastify";
import Authors from "./components/Authors";

function App() {
  const [currentArticles, setCurrentArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchArticles()
      .then((articles) => {
        setCurrentArticles(articles);
        setIsLoading(false);
      })
      .catch((err) => {
        toast.error("Could not load articles! Please try again later.");
      });
  }, []);

  return (
    <>
      <Header />
      <main className="container text-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/articles"
            element={
              <Articles
                currentArticles={currentArticles}
                isLoading={isLoading}
              />
            }
          />
          <Route path="/articles/:article_id" element={<ArticleContainer />} />
          <Route path="/authors" element={<Authors />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
