import { easyFetch } from "../../fetch";

export const likePost = async (token, postId) => {
  const url = `http://localhost:3010/post/like/${postId}`;
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

export const savePost = async (token, postId) => {
  const url = `http://localhost:3010/post/save/${postId}`;
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

export const commentPost = async (token, postId, comment) => {
  const url = `http://localhost:3010/post/comment/${postId}`;
  const response = await easyFetch(
    url,
    {
      authorization: token,
    },
    "POST",
    {
      comment,
    }
  );
  const responseStatus = response.status;
  return responseStatus;
};
