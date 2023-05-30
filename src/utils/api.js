import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  throw new Error("API URL not provided!");
}

const api = axios.create({
  baseURL: API_URL,
});

export const fetchArticles = () => {
  return api
    .get("articles")
    .then(({ data }) => {
      return data.articles;
    })
    .catch((err) => {
      console.log("Something went wrong fetching articles!");
      console.log(err);
    });
};
