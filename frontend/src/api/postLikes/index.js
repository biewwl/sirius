import { easyFetch } from "../../helpers/fetch";

export const deletePostLike = async (token, postId) => {
  const url = `http://localhost:3010/delete/post-like/${postId}`;
  const response = await easyFetch(
    url,
    {
      authorization: token,
    },
    "DELETE"
  );
  const responseStatus = response.status;
  return responseStatus;
};

export const countPostLikes = async (token, id) => {
  const url = `http://localhost:3010/count/post-likes/${id}`;
  const response = await easyFetch(url, {
    authorization: token,
  });
  const responseJson = await response.json();
  return responseJson;
};

export const createPostLike = async (token, postId) => {
  const url = `http://localhost:3010/create/post-like/${postId}`;
  const response = await easyFetch(
    url,
    {
      authorization: token,
    },
    "POST"
  );
  const responseStatus = response.status;
  return responseStatus;
};

export const checkILike = async (options) => {
  const { token, postId } = options;
  const url = `http://localhost:3010/check/i-like/${postId}`;
  const response = await easyFetch(url, {
    authorization: token,
  });
  const responseJson = await response.json();
  return responseJson;
};
