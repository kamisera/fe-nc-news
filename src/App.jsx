import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import { useEffect, useState } from "react";
import { fetchArticles } from "./utils/api";
import Header from "./components/Header";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Articles from "./components/Articles";
import Home from "./components/Home";

function App() {
  const [currentArticles, setCurrentArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchArticles().then((articles) => {
      setCurrentArticles(articles);
      setIsLoading(false);
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
        </Routes>
      </main>
    </>
  );
}

export default App;