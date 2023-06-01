import axios from "axios";

const api = axios.create({
  baseURL: "https://nc-news-v4me.onrender.com/api/",
});

export const fetchArticles = (searchParams) => {
  let url = "articles";
  const topic = searchParams.get("topic");
  if (topic) {
    url += `?topic=${topic}`;
  }
  return api.get(url).then(({ data }) => {
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

export const voteOnArticle = (articleId, amount) => {
  const data = { inc_votes: amount };
  return api.patch(`articles/${articleId}`, data).then(({ data }) => {
    return data.article;
  });
};

export const fetchTopics = () => {
  return api.get("topics").then(({ data }) => {
    return data.topics;
  });
};
