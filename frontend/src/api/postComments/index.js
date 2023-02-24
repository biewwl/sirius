import { easyFetch } from "../../helpers/fetch";

export const listPostComments = async (token, id) => {
  const url = `http://localhost:3010/list/post-comments/${id}`;
  const response = await easyFetch(url, {
    authorization: token,
  });
  const responseJson = await response.json();
  return responseJson;
};

export const countPostComments = async (token, id) => {
  const url = `http://localhost:3010/count/post-comments/${id}`;
  const response = await easyFetch(url, {
    authorization: token,
  });
  const responseJson = await response.json();
  return responseJson;
};

export const createPostComment = async (token, postId, comment) => {
  const url = `http://localhost:3010/create/post-comment/${postId}`;
  const response = await easyFetch(
    url,
    {
      authorization: token,
    },
    "POST",
    { comment }
  );
  const responseStatus = response.status;
  return responseStatus;
};
