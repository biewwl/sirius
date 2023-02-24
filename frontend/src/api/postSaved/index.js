import { easyFetch } from "../../helpers/fetch";

export const deletePostSave = async (token, postId) => {
  const url = `http://localhost:3010/delete/post-save/${postId}`;
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

export const countPostSaved = async (token, id) => {
  const url = `http://localhost:3010/count/post-saved/${id}`;
  const response = await easyFetch(url, {
    authorization: token,
  });
  const responseJson = await response.json();
  return responseJson;
};

export const createPostSave = async (token, postId) => {
  const url = `http://localhost:3010/create/post-save/${postId}`;
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

export const listPostsSaved = async (token) => {
  const url = "http://localhost:3010/list/posts-saved";
  const response = await easyFetch(url, {
    authorization: token,
  });
  const responseJson = await response.json();
  return responseJson;
};

export const checkISave = async (options) => {
  const { token, postId } = options;
  const url = `http://localhost:3010/check/i-save/${postId}`;
  const response = await easyFetch(url, {
    authorization: token,
  });
  const responseJson = await response.json();
  return responseJson;
};
