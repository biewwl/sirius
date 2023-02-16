import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { searchUsers } from "../../helpers/fetch";
import { userBlockedData } from "../../mocks/userData";
import CardUserProfileRow from "../CardUserProfileRow";
import { connect } from "react-redux";
import { useInView } from "react-intersection-observer";
import "./styles/SearchResults.css";
import "./styles/SearchResults-mobile.css";

function SearchResults({ query, token }) {
  // Hooks
  const [offset, setOffset] = useState(0);
  const [last, setLast] = useState(0);
  const [foundUsers, setFoundUsers] = useState([]);
  const [resultsEnd, setResultsEnd] = useState(false);
  const limit = 5;

  // IntersectionObserver
  const opt = {
    root: null,
    rootMargin: "0px",
    threshold: 0.3,
  };

  const { ref, inView } = useInView(opt);

  // Fetch
  const fetchMoreResults = async () => {
    if (query.length > 0) {
      const results = await searchUsers(query, limit, offset, token);
      const newFoundUsers = [...foundUsers, ...results];
      const lastIndex = newFoundUsers.length;
      if (results.length < limit) {
        setResultsEnd(true);
      }
      setFoundUsers(newFoundUsers);
      setOffset(lastIndex);
      setLast(lastIndex - 1);
    } else {
      setFoundUsers([]);
    }
  };

  const fetchResults = useCallback(async () => {
    const results = await searchUsers(query, limit, 0, token);
    const newFoundUsers = results;
    const lastIndex = newFoundUsers.length;
    if (results.length < limit) {
      setResultsEnd(true);
    }
    setFoundUsers(newFoundUsers);
    setOffset(lastIndex);
    setLast(lastIndex - 1);
  });

  // UseEffects
  useEffect(() => {
    fetchResults();
  }, [query]);

  useEffect(() => {
    if (!resultsEnd) {
      fetchMoreResults();
    }
  }, [inView]);

  return (
    <aside className="search-results">
      {foundUsers.map((user, i) => {
        const { blocked, nick } = user;
        const refElement = i === last ? ref : null;
        return (
          <div key={i} ref={refElement}>
            <CardUserProfileRow
              userData={blocked ? userBlockedData(nick) : user}
            />
          </div>
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
