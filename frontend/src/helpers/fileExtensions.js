const fileExtensions = (file, icon = false) => {
  const fileType = file.type;

  const typeParts = fileType.split("/");
  if (typeParts.length !== 2) {
    return "others";
  }

  if (!icon) {
    switch (typeParts[0]) {
      case "image":
        return "image";
      case "video":
        return "video";
      default:
        return "file";
    }
  }

  switch (typeParts[0]) {
    case "image":
      return "akar-icons:image";
    case "video":
      return "akar-icons:video";
    default:
      return "akar-icons:file";
  }
};

export default fileExtensions;
