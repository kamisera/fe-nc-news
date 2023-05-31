import axios from "axios";

const api = axios.create({
  baseURL: "https://nc-news-v4me.onrender.com/api/",
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

export const fetchUsers = () => {
  return api.get(`users`).then(({ data }) => {
    return data.users;
  });
};
