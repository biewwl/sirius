const folderName = (file) => {
  const fileType = file.mimetype;

  if (!fileType) {
    throw new Error("O tipo de arquivo não foi especificado.");
  }

  const typeParts = fileType.split('/');
  if (typeParts.length !== 2) {
    return "others";
  }

  switch (typeParts[0]) {
    case "image":
      return "images";
    case "video":
      return "videos";
    case "application":
      return "docs";
    default:
      return "others";
  }
};

module.exports = folderName;
