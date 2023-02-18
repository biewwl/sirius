import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { userBlockedData } from "../../mocks/userData";
import CardUserProfileRow from "../CardUserProfileRow";
import { connect } from "react-redux";
import { useInView } from "react-intersection-observer";
import fetchPaginate from "../../helpers/fetchPaginate";
import "./styles/SearchResults.css";
import "./styles/SearchResults-mobile.css";

function SearchResults({ query, token }) {
  // Hooks
  const [offset, setOffset] = useState(0);
  const [foundUsers, setFoundUsers] = useState([]);
  const [resultsEnd, setResultsEnd] = useState(false);
  const limit = 1;
  const [last, setLast] = useState(limit - 1);

  // IntersectionObserver
  const opt = {
    root: null,
    rootMargin: "0px",
    threshold: 1,
  };

  const { ref, inView } = useInView(opt);
  // ///////////////

  const fetchResults = async (NEW = true) => {
    const url = `search?query=${query}`;
    const op = "&";
    const newResults = await fetchPaginate({ limit, offset, token, url, op });
    const results = NEW ? newResults : [...foundUsers, ...newResults];
    const nextOffset = results.length;
    if (newResults.length < limit) setResultsEnd(true);
    setFoundUsers(results);
    setOffset(nextOffset);
    setLast(nextOffset - 1);
  };

  const clearSetup = () => {
    setOffset(0);
    setLast(0);
    setResultsEnd(false);
    setFoundUsers([]);
  };

  // UseEffects
  useEffect(() => {
    clearSetup()
    fetchResults();
  }, [query]);

  if (inView && !resultsEnd) fetchResults(false);

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
