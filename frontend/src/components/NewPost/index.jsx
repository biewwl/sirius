import React from "react";
import generateClassName from "../../helpers/generateClassBEM";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Icon } from "@iconify/react";
import "./styles/NewPost.css";
import "./styles/NewPost-mobile.css";

function NewPost({ accountDataREDUX }) {

  const { name, avatarUrl } = accountDataREDUX;


  const firstName = name ? name.split(" ")[0] : "";


  const primaryClassName = "new-post";
  const customClassName = generateClassName(primaryClassName);

  return (
    <section className={primaryClassName}>
          <div className={customClassName("avatar-and-name")}>
            <img
              src={avatarUrl}
              alt=""
              className={customClassName("avatar-and-name__avatar")}
            />
            <h4 className={customClassName("avatar-and-name__name")}>
              What&apos;s new, {firstName}?
            </h4>
          </div>
          <button className={customClassName("action-btn")}>
            <Icon icon="pajamas:link" />
            <span className={customClassName("action-btn__text")}>
              Post it!
            </span>
          </button>
        </section>
  );
}

const mapStateToProps = (state) => ({
  accountDataREDUX: state.userReducer.accountData,
  token: state.userReducer.token,
});

export default connect(mapStateToProps)(NewPost);

NewPost.propTypes = {
  token: PropTypes.string,
  accountDataREDUX: PropTypes.shape(),
};
