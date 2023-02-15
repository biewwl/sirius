import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { searchUsers } from "../../helpers/fetch";
import { verifiedType } from "../../helpers";
import { Icon } from "@iconify/react";
import { userBlockedData } from "../../mocks/userData";
import { connect } from "react-redux";
import "./styles/SearchResults.css";
import "./styles/SearchResults-mobile.css";

function SearchResults({ query, token }) {
  const [foundUsers, setFoundUsers] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      if (query.length > 0) {
        const results = await searchUsers(query, token);
        setFoundUsers(results);
      } else {
        setFoundUsers([]);
      }
    };
    fetchResults();
  }, [query]);

  return (
    <aside className="search-results">
      {foundUsers.map((user, i) => {
        const { blocked, nick } = user;
        const { avatarUrl, coverUrl, name, accountVerified } = !blocked
          ? user
          : userBlockedData(nick);
        const isVerifiedAccount = accountVerified !== "none";
        const { text, icon } = verifiedType(accountVerified);

        return (
          <Link
            to={`/${nick}`}
            key={i}
            style={{ backgroundImage: `url("${coverUrl}")` }}
            className="search-result"
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
      })}
    </aside>
  );
}

const mapStateToProps = (state) => ({
  token: state.userReducer.token,
});

export default connect(mapStateToProps)(SearchResults);

SearchResults.propTypes = {
  query: PropTypes.string,
  token: PropTypes.string,
};
