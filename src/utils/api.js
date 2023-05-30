import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  throw new Error("API URL not provided!");
}

const api = axios.create({
  baseURL: API_URL,
});

export const fetchArticles = () => {
  return api.get("articles").then(({ data }) => {
    return data.articles;
  });
};

export const fetchArticle = (articleId) => {
  return api.get(`articles/${articleId}`).then(({ data }) => {
    return data.article;
  });
};

export const fetchArticleComments = (articleId) => {
  return api.get(`articles/${articleId}/comments`).then(({ data }) => {
    return data.comments;
  });
};
