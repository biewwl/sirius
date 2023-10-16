const { File } = require("../db/models");
const fs = require("fs");
const path = require("path");

const createFile = async (fileInfo, userId) => {
  const { name, folder } = fileInfo;

  if (fileInfo) {
    const result = await File.create({
      name,
      folder,
      userId,
    });

    return result;
  }

  return true;
};

const deleteFile = async (fileInfo, userId) => {
  const { name, folder } = fileInfo;

  const pathName = path.join(__dirname, "../db/files", folder, name);

  fs.unlink(pathName, (err) => {
    if (err) {
      throw new Error("Could not delete!")
    }
  });

  if (fileInfo) {
    const result = await File.destroy({
      where: {
        name,
        folder,
        userId,
      },
    });

    return result;
  }

  return true;
};

module.exports = { createFile, deleteFile };
