const fileService = require("../services/file.service");

const getFile = async (req, res, next) => {
  try {
    const { url } = req.params;

    const folder = url.split("|")[0];
    const fileName = url.split("|")[1];

    const path = require("path");

    res.sendFile(path.join(__dirname, "../db/files", folder, fileName));
  } catch (error) {
    next(error);
  }
};

const createFiles = async (req, res, next) => {
  try {
    const {imagesInfo} = req.body;
    const { filesInfo, userId } = req;
    if (filesInfo) {
      const filesData = filesInfo.map((file) => {
        const { name, folder } = file;
        const fileUrl = filesInfo
          ? `http://10.0.0.98:3010/files/${folder}|${name}`
          : "";

          
        return { fileUrl, userId };
      });

      await fileService.createFiles(filesData, userId);
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { getFile, createFiles };
