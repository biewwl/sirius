const postService = require("../services/post.service");

const sendNickPostOwnerToReq = async (req, _res, next) => {
  try {
    const { postId } = req.params;
    const nick = await postService.getNickPostOwnerByPostId(postId);
    req.params.nick = nick;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = sendNickPostOwnerToReq;
