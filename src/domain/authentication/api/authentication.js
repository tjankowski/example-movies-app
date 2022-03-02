import { request } from "infrastrucutre/api";

export const signIn = async (username, password) => {
  const responseBody = await request(`/session`, {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
  return responseBody.jwt;
};
