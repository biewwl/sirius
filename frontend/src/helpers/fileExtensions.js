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

export const getExtension = (fileName) => {
  const reversedUrl = fileName.split("").reverse().join(""); // Inverte a URL
  const firstDotIndex = reversedUrl.indexOf(".");
  const reversedExtension = reversedUrl.substring(0, firstDotIndex + 1); // Inverte a extensão
  const extension = reversedExtension.split("").reverse().join("");
  return extension;
};

export default fileExtensions;
