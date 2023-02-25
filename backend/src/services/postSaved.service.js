const { PostSaved, Post, User } = require("../db/models");
const error = require("../utils/error");

const checkSave = async (userId, postId) => {
  const save = await PostSaved.findOne({
    where: {
      userId,
      postId,
    },
  });

  const saveBoolean = save ? true : false;
  return saveBoolean;
};

const listSaved = async (userId) => {
  const saved = await PostSaved.findAll({
    where: {
      userId,
    },
    include: [
      {
        model: Post,
        as: "postSaved",
        include: [
          {
            model: User,
            as: "userPost",
            attributes: { exclude: ["id", "email", "password"] },
          },
        ],
      },
    ],
    attributes: [],
  });

  return saved;
};

const createPostSave = async (userId, postId) => {
  const existsSave = await checkSave(userId, postId);

  if (existsSave) return error(400, "Already save");

  const save = await PostSaved.create({
    userId,
    postId,
  });

  return save;
};

const deletePostSave = async (userId, postId) => {
  const existsSave = await checkSave(userId, postId);

  if (!existsSave) return error(400, "Already not saved");

  const save = await PostSaved.destroy({
    where: { userId, postId },
  });

  return save;
};

module.exports = { checkSave, listSaved, createPostSave, deletePostSave };
