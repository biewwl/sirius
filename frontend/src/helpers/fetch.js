import { checkBlock, createBlock, deleteBlock } from "../api/block";
import { checkFollowMe, checkIFollow, countFollowers, countFollowing, createFollow, deleteFollow, listFollowers, listFollowing } from "../api/follow";
import { countPosts, dataPost, listFeed, listPosts } from "../api/post";
import { countPostComments, createPostComment, listPostComments } from "../api/postComments";
import { checkILike, countPostLikes, createPostLike, deletePostLike } from "../api/postLikes";
import { checkISave, countPostSaved, createPostSave, deletePostSave, listPostsSaved } from "../api/postSaved";
import { countPostViews } from "../api/postViews";
import { listSearch } from "../api/search";
import { createRegister, dataAccount, dataProfile, tokenLogin } from "../api/user";

export const easyFetch = async (url, headers, method, body) => {
  const options = {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      ...headers,
    },
    body: JSON.stringify(body),
  };
  if (!method) {
    delete options.method;
  }
  if (!body) {
    delete options.body;
  }
  const response = await fetch(url, options);
  return response;
};

export {
  checkBlock,
  createBlock,
  deleteBlock,

  listFollowing,
  listFollowers,
  countFollowing,
  countFollowers,
  createFollow,
  deleteFollow,
  checkIFollow,
  checkFollowMe,

  dataPost,
  listPosts,
  countPosts,
  listFeed,

  listPostComments,
  countPostComments,
  createPostComment,

  deletePostLike,
  countPostLikes,
  createPostLike,
  checkILike,

  deletePostSave,
  countPostSaved,
  createPostSave,
  listPostsSaved,
  checkISave,

  countPostViews,

  listSearch,

  dataProfile,
  dataAccount,
  tokenLogin,
  createRegister,
};

