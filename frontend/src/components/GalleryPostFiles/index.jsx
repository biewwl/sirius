import React, { useEffect } from "react";
import PropTypes from "prop-types";
// import { Link } from "react-router-dom";
import generateClassName from "../../helpers/generateClassBEM";
import { FileIcon } from "react-file-icon";
import { getExtension } from "../../helpers/fileExtensions";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./styles/GalleryPostFiles.css";

function GalleryPostFiles({ files, setSelectedImageUrl }) {
  const primaryClassName = "gallery-post-files-component";
  const customClassName = generateClassName(primaryClassName);

  const showDots = files.length > 1;

  const handleInView = (i) => {
    if (i === 0 || i) {
      setSelectedImageUrl(files[i].fileUrl);
    }
  };

  useEffect(() => {
    handleInView(0);
  }, []);

  return (
    <section className={primaryClassName}>
      <Carousel
        showThumbs={false}
        showStatus={false}
        dynamicHeight
        showIndicators={showDots}
        onChange={handleInView}
      >
        {files.map((file, i) => {
          const { fileUrl, postId } = file;
          const isVideo = () => {
            if (fileUrl) {
              const video = fileUrl.includes("videos|");
              if (video) return true;
            }
          };

          const isOther = () => {
            if (fileUrl) {
              const others = fileUrl.includes("others|");
              if (others) return true;
            }
          };

          const isDocs = () => {
            if (fileUrl) {
              const docs = fileUrl.includes("docs|");
              if (docs) return true;
            }
          };

          const isImage = () => {
            const image = !isDocs() && !isOther() && !isVideo() && fileUrl;
            return image;
          };

          const fileName = () => {
            if (isDocs() || isOther()) {
              const splittedUrl = fileUrl.split("|")[1];
              const onlyFileName = splittedUrl.split("_")[1];

              let smallName = onlyFileName.slice(0, 15);
              if (onlyFileName.length > 15) smallName += "...";

              return smallName;
            }
          };

          return (
            <div
              to={`/post/${postId}`}
              className={customClassName("link-image")}
              key={i}
            >
              {isImage() && (
                <img
                  src={fileUrl}
                  alt=""
                  className={customClassName("link-image__image")}
                />
              )}
              {isVideo() && (
                <video
                  controls
                  autoPlay
                  className={customClassName("link-image__image")}
                >
                  <source src={fileUrl} type="video/mp4" />
                  Seu navegador não suporta a exibição de vídeos.
                </video>
              )}
              {isOther() && (
                <Link
                  to={fileUrl}
                  target="blank"
                  className={customClassName("link-image__others")}
                >
                  <FileIcon
                    labelColor="var(--accent)"
                    glyphColor="var(--accent)"
                    extension={getExtension(fileUrl)}
                    type="binary"
                  />
                  {fileName()}
                </Link>
              )}
              {isDocs() && (
                <Link
                  to={fileUrl}
                  target="blank"
                  className={customClassName("link-image__docs")}
                >
                  <FileIcon
                    labelColor="var(--accent)"
                    glyphColor="var(--accent)"
                    extension={getExtension(fileUrl)}
                    type="document"
                  />
                  {fileName()}
                </Link>
              )}
            </div>
          );
        })}
      </Carousel>
    </section>
  );
}

export default GalleryPostFiles;

GalleryPostFiles.propTypes = {
  files: PropTypes.array,
  setSelectedImageUrl: PropTypes.func,
};
