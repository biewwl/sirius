import React from "react";
import { Icon } from "@iconify/react";
import PropTypes from "prop-types";
import "./styles/SectionTitle.css";

function SectionTitle({ title, icon, style, onClickIcon }) {
  return (
    <div className="section-title" style={style}>
      <Icon icon={icon} onClick={onClickIcon} />
      <h2>{title}</h2>
    </div>
  );
}

export default SectionTitle;

SectionTitle.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
  style: PropTypes.shape(),
  onClickIcon: PropTypes.func,
};
