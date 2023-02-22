const { verifyExistsPost } = require("../services/post.service");

const validateExistsPost = async (req, res, next) => {
  try {
    const { postId } = req.params;

    if (!postId) throw new Error("400 | postId is required");
    const postIdNumber = Number(postId);
    if (isNaN(postIdNumber)) throw new Error("400 | postId must be a number");
    await verifyExistsPost(postId, "exists");
    req.params.postId = postIdNumber;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validateExistsPost;
