const { File } = require("../db/models");

const createFile = async (fileInfo) => {
  const { name, folder } = fileInfo;

  if (fileInfo) {
    const result = await File.create({
      name,
      folder,
    });

    return result;
  }

  return true;
};

module.exports = { createFile };
