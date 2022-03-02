import { getItem } from "./storage";

//TODO that should be moved to env variables
const BASE_URL = "https://peanut-movies.herokuapp.com/api/v1";

export const request = async (url, options) => {
  const token = getItem("token");
  const authHeader =
    token != null ? { Authorization: `Bearer ${token}` } : null;
  const response = await fetch(`${BASE_URL}${url}`, {
    headers: {
      "Content-Type": "application/json",
      ...authHeader,
    },
    ...options,
  });
  try {
    return await response.json();
  } catch (exception) {
    return {};
  }
};
