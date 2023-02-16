import { Icon } from "@iconify/react";
import React from "react";
import { verifiedType } from "../../helpers";
import PropTypes from "prop-types";
import "./styles/CardUserProfileRow.css";
import { Link } from "react-router-dom";

function CardUserProfileRow({ userData, ref }) {
  const { avatarUrl, coverUrl, name, nick, accountVerified } = userData;
  const isVerifiedAccount = accountVerified !== "none";
  const { text, icon } = verifiedType(accountVerified);

  return (
    <Link
      to={`/${nick}`}
      className="card-user-profile"
      style={{ backgroundImage: `url("${coverUrl}")` }}
      ref={ref}
    >
      <img src={avatarUrl} alt="" className="avatar" />
      <div className="name-and-nick">
        <div className="name">
          <span>{name}</span>
          {isVerifiedAccount && (
            <div title={text}>
              <Icon icon={icon} className={accountVerified} />
            </div>
          )}
        </div>
        <span className="nick">@{nick}</span>
      </div>
    </Link>
  );
}

export default CardUserProfileRow;

CardUserProfileRow.propTypes = {
  userData: PropTypes.shape(),
  ref: PropTypes.func,
};
