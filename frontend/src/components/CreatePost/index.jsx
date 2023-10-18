import React, { useState } from "react";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import { connect } from "react-redux";
import UserAvatarStory from "../UserAvatarStory";
// import fileExtensions from "../../helpers/fileExtensions";
import "./styles/CreatePost.css";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../helpers/requests/POST/post";
// import { easyFetch } from "../../helpers/fetch";

function CreatePost({ handleQuit, accountDataREDUX, token }) {
  const [files, setFiles] = useState([]);
  const [postData, setPostData] = useState({
    caption: "",
  });
  const [loading, setLoading] = useState(false);

  const { avatarUrl, nick } = accountDataREDUX;
  const { caption } = postData;
  const navigate = useNavigate();

  const handleSelectFile = (e) => {
    setFiles(e.target.files);
  };

  const handleChangeForm = ({ target }) => {
    const { name, value } = target;
    setPostData({ ...postData, [name]: value });
  };

  const onSubmitFile = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    formData.append("postData", JSON.stringify(postData));

    const id = await createPost(token, formData);
    setFiles([]); // Limpa o array de arquivos após o envio
    setPostData({ caption: "" });
    handleQuit();
    navigate(`/post/${id}`);
  };

  const isDisabled = caption.length === 0 && files.length === 0;

  return (
    <section className="create-post">
      <form className="create-post__form" onSubmit={onSubmitFile}>
        <div className="create-post__form__user">
          <UserAvatarStory avatarUrl={avatarUrl} nick={nick} size="45" />
          <span>
            Post as{" "}
            <span className="create-post__form__user__nick">{nick}</span>
          </span>
        </div>
        <button className="create-post__form__quit" onClick={handleQuit}>
          <Icon icon="octicon:x-12" />
        </button>
        <textarea
          type="text"
          name="caption"
          value={caption}
          onChange={handleChangeForm}
          placeholder="Share your thoughts here..."
          className="create-post__form__caption-input"
        />
        <div className="create-post__form__actions">

          <label
            htmlFor="files"
            className="create-post__form__actions__file-label"
          >
            <Icon icon="octicon:plus-16" />
            <input
              onChange={handleSelectFile}
              type="file"
              name="files"
              id="files"
              multiple
              className="create-post__form__actions__file-label__file-input"
            />
          </label>
          <button
            type="submit"
            className="create-post__form__actions__post-btn"
            disabled={isDisabled}
          >
            Post!
            {loading && <Icon icon="line-md:uploading-loop" />}
          </button>
        </div>
      </form>
    </section>
  );
}

const mapStateToProps = (state) => ({
  accountDataREDUX: state.userReducer.accountData,
  token: state.userReducer.token,
});

export default connect(mapStateToProps)(CreatePost);

CreatePost.propTypes = {
  handleQuit: PropTypes.func,
  token: PropTypes.string,
  accountDataREDUX: PropTypes.shape(),
};
