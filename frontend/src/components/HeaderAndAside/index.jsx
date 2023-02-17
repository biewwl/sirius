import React from "react";
import Header from "../Header";
import Header_mobile from "../Header_mobile";
import HeaderAside from "../HeaderAside";
import "./styles/HeaderAndAside.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";

function HeaderAndAside({ token }) {
  const isLogged = token;

  return (
    <>
      <Header />
      <Header_mobile />
      {isLogged && <HeaderAside />}
    </>
  );
}

const mapStateToProps = (state) => ({
  token: state.userReducer.token,
  accountDataREDUX: state.userReducer.accountData,
});

export default connect(mapStateToProps)(HeaderAndAside);

HeaderAndAside.propTypes = {
  token: PropTypes.string,
};
