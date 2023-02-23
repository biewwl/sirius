import React from "react";
import Header from "../Header";
import HeaderMobile from "../HeaderMobile";
import HeaderAside from "../HeaderAside";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./styles/HeaderAndAside.css";

function HeaderAndAside({ token }) {
  const isLogged = token;

  return (
    <>
      <Header />
      <HeaderMobile />
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
