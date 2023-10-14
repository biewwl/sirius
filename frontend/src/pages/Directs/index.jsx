import React from "react";
import HeaderAndAside from "../../components/HeaderAndAside";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ChatsList from "../../components/ChatsList";
import { Icon } from "@iconify/react";
import "./styles/Directs.css";
import "./styles/Directs-mobile.css";

function Directs() {
  return (
    <div className="div-page">
      <HeaderAndAside />
      <section className="directs">
        <div className="directs__slogan">
          <Icon icon="material-symbols:short-text" className="directs__slogan__icon" />
          <p className="directs__slogan__text">Text a friend</p>
        </div>
      </section>
      <ChatsList />
    </div>
  );
}

const mapStateToProps = (state) => ({
  accountDataREDUX: state.userReducer.accountData,
  token: state.userReducer.token,
});

export default connect(mapStateToProps)(Directs);

Directs.propTypes = {
  token: PropTypes.string,
  accountDataREDUX: PropTypes.shape(),
};
