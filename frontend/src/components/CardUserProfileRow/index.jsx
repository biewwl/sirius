import { Icon } from "@iconify/react";
import React from "react";
import { verifiedType } from "../../helpers";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import generateClassName from "../../helpers/generateClassBEM";
import "./styles/CardUserProfileRow.css";

function CardUserProfileRow({ userData, ref }) {
  const { avatarUrl, coverUrl, name, nick, accountVerified } = userData;
  const isVerifiedAccount = accountVerified !== "none";
  const { text, icon } = verifiedType(accountVerified);

  const primaryClassName = "card-user-profile-row";
  const customClassName = generateClassName(primaryClassName);

  return (
    <Link
      to={`/p/${nick}`}
      className={primaryClassName}
      style={{ backgroundImage: `url("${coverUrl}")` }}
      ref={ref}
    >
      <img src={avatarUrl} alt="" className={customClassName("avatar")} />
      <div className={customClassName("name-and-nick")}>
        <div className={customClassName("name-and-nick__name-area")}>
          <span className={customClassName("name-and-nick__name-area__name")}>
            {name}
          </span>
          {isVerifiedAccount && (
            <div
              title={text}
              className={customClassName("name-and-nick__name-area__verified")}
            >
              <Icon
                icon={icon}
                className={customClassName(
                  "name-and-nick__name-area__verified__verified-icon",
                  null,
                  `verified-${accountVerified}`
                )}
              />
            </div>
          )}
        </div>
        <span className={customClassName("name-and-nick__name-area__nick")}>
          @{nick}
        </span>
      </div>
    </Link>
  );
}

export default CardUserProfileRow;

CardUserProfileRow.propTypes = {
  userData: PropTypes.shape(),
  ref: PropTypes.func,
};
