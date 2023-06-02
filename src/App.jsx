import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import Header from "./components/Header";
import "./App.css";
import { Routes, Route, useSearchParams } from "react-router-dom";
import Articles from "./components/Articles";
import Home from "./components/Home";
import ArticleContainer from "./components/ArticleContainer";
import Topics from "./components/Topics";
import { toast } from "react-toastify";
import Authors from "./components/Authors";
import Footer from "./components/Footer";
import PageNotFound from "./components/PageNotFound";

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
          <Route path="/authors" element={<Authors />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
