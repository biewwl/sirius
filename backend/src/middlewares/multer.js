const multer = require("multer");
const folderName = require("../utils/folderName");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, `./src/db/files/${folderName(file)}`);
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}_${file.originalname}`;
    req.fileInfo = {
      name: fileName,
      folder: folderName(file),
    };
    return cb(null, fileName);
  },
});

const upload = multer({ storage });

const checkFileUpload = async (req, res, next) => {
  upload.single("file")(req, res, next);
};

module.exports = {
  upload,
  checkFileUpload,
};
