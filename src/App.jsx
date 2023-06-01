import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import Header from "./components/Header";
import "./App.css";
import { Routes, Route, useSearchParams } from "react-router-dom";
import Articles from "./components/Articles";
import Home from "./components/Home";
import ArticleContainer from "./components/ArticleContainer";
import Topics from "./components/Topics";

function App() {
  return (
    <>
      <Header />
      <main className="container text-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:article_id" element={<ArticleContainer />} />
          <Route path="/topics/" element={<Topics />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
