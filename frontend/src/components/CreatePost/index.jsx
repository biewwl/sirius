import React, { useState } from "react";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import { connect } from "react-redux";
import "./styles/CreatePost.css";
import UserAvatarStory from "../UserAvatarStory";
import fileExtensions from "../../helpers/fileExtensions";
// import { easyFetch } from "../../helpers/fetch";

function CreatePost({ handleQuit, accountDataREDUX, token }) {
  const [file, setFile] = useState(null);
  const [postData, setPostData] = useState({
    caption: "",
  });

  const { avatarUrl, nick } = accountDataREDUX;
  const { caption } = postData;

  const handleSelectFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleChangeForm = ({ target }) => {
    const { name, value } = target;
    setPostData({ ...postData, [name]: value });
  };

  const onSubmitFile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("postData", JSON.stringify(postData));

    const post = await fetch("http://10.0.0.98:3010/post", {
      method: "POST",
      body: formData,
      headers: { authorization: token },
    });
    const postJson = await post.json();
    setFile(null);
    setPostData({ caption: "" });
    handleQuit();
    return postJson;
  };

  return (
    <section className="create-post">
      <form className="create-post__form" onSubmit={onSubmitFile}>
        <div className="create-post__form__user">
          <UserAvatarStory avatarUrl={avatarUrl} nick={nick} size="35" />
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
          {file && (
            <span className="create-post__form__actions__selected-message">
              <Icon
                className={`create-post__form__actions__selected-message__icon --${fileExtensions(
                  file
                )}`}
                icon={fileExtensions(file, true)}
              />
              <span className="create-post__form__actions__selected-message__text">
                {fileExtensions(file)}
              </span>
            </span>
          )}
          <label
            htmlFor="file"
            className="create-post__form__actions__file-label"
          >
            <Icon icon="octicon:plus-16" />
            <input
              onChange={handleSelectFile}
              type="file"
              name="file"
              id="file"
              className="create-post__form__actions__file-label__file-input"
            />
          </label>
          <button
            type="submit"
            className="create-post__form__actions__post-btn"
          >
            Post!
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
