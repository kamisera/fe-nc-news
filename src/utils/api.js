import axios from "axios";

const api = axios.create({
  baseURL: "https://nc-news-v4me.onrender.com/api/",
});

export const fetchArticles = (searchParams) => {
  let url = "articles";
  const greenList = ["topic", "sort_by", "order"];
  const queries = [];
  if (searchParams) {
    for (const [key, value] of searchParams) {
      if (greenList.includes(key)) {
        queries.push(`${key}=${value}`);
      }
    }
  }
  if (queries.length) {
    url += "?" + queries.join("&");
  }
  return api
    .get(url)
    .then(({ data }) => {
      return data.articles;
    })
    .catch((err) => {
      return Promise.reject(err.response);
    });
};

export const fetchArticle = (articleId) => {
  return api
    .get(`articles/${articleId}`)
    .then(({ data }) => {
      return data.article;
    })
    .catch((err) => {
      return Promise.reject(err.response);
    });
};

export const fetchArticleComments = (articleId) => {
  return api
    .get(`articles/${articleId}/comments`)
    .then(({ data }) => {
      return data.comments;
    })
    .catch((err) => {
      return Promise.reject(err.response);
    });
};

export const fetchUsers = () => {
  return api
    .get(`users`)
    .then(({ data }) => {
      return data.users;
    })
    .catch((err) => {
      return Promise.reject(err.response);
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
    })
    .catch((err) => {
      return Promise.reject(err.response);
    });
};

export const voteOnArticle = (articleId, amount) => {
  const data = { inc_votes: amount };
  return api
    .patch(`articles/${articleId}`, data)
    .then(({ data }) => {
      return data.article;
    })
    .catch((err) => {
      return Promise.reject(err.response);
    });
};

export const fetchTopics = () => {
  return api
    .get(`topics`)
    .then(({ data }) => {
      return data.topics;
    })
    .catch((err) => {
      return Promise.reject(err.response);
    });
};

export const deleteComment = (commentId) => {
  return api
    .delete(`comments/${commentId}`)
    .then(({ data }) => {
      return data.topics;
    })
    .catch((err) => {
      return Promise.reject(err.response);
    });
};
