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

export const postComment = (username, articleId, body) => {
  return api
    .post(`articles/${articleId}/comments`, {
      username,
      body,
    })
    .then(({ data }) => {
      return data.comment;
    });
};
export const voteOnArticle = (articleId, amount) => {
  const data = { inc_votes: amount };
  return api.patch(`articles/${articleId}`, data).then(({ data }) => {
    return data.article;
  });
};
