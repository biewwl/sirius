const postService = require("../services/post.service");

const ACCESS_ONLY_WITH_EXISTENT_POST = async (req, _res, next) => {
  try {
    const { postId } = req.params;
    if (!postId) throw new Error("400 | PostId is required");

    const postIdNumber = Number(postId);
    if (isNaN(postIdNumber)) throw new Error("400 | PostIs must be a number");

    const validatePostId = await postService.checkExistsPost(postId);
    if (!validatePostId) throw new Error("404 | Post not found");

    const postOwner = await postService.getPostOwnerNickByPostId(postIdNumber);

    req.params.postId = postIdNumber;
    req.params.nick = postOwner;

    return next();
  } catch (error) {
    next(error);
  }
};

module.exports = ACCESS_ONLY_WITH_EXISTENT_POST;
