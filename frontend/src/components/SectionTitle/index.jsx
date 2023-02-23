import React from "react";
import { Icon } from "@iconify/react";
import PropTypes from "prop-types";
import generateClassName from "../../helpers/generateClassBEM";
import "./styles/SectionTitle.css";

function SectionTitle({ title, icon, style, onClickIcon }) {
  const primaryClassName = "section-title-component";
  const customClassName = generateClassName(primaryClassName);

  return (
    <div className={primaryClassName} style={style}>
      <Icon
        icon={icon}
        onClick={onClickIcon}
        className={customClassName("icon")}
      />
      <h2 className={customClassName("title")}>{title}</h2>
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
