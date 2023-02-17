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
  const [foundUsers, setFoundUsers] = useState([]);
  const [resultsEnd, setResultsEnd] = useState(false);
  const limit = 10;
  const [last, setLast] = useState(limit - 1);

  // IntersectionObserver
  const opt = {
    root: null,
    rootMargin: "0px",
    threshold: 0.3,
  };

  const { ref, inView } = useInView(opt);
  // ///////////////

  // Fetch
  const fetchResults = useCallback(async (fetchNew = true) => {
    // STEP 1: Verify if get news results or get more results
    let results;
    let lastIndex;
    if (fetchNew) {
      // STEP 2: Fetch new results
      const newResults = await searchUsers(query, limit, 0, token);
      results = newResults;
    } else {
      // STEP 2: Fetch more results
      const newResults = await searchUsers(query, limit, offset, token);
      results = [...foundUsers, ...newResults];
    }
    // STEP 3: Saves the number of the last item to know the offset of the next one
    lastIndex = results.length;
    // STEP 4: If the last fetch brings less item than the limit, it means there are no more results
    if (results.length < limit) {
      setResultsEnd(true);
    }
    // STEP 5: Save the follows list
    setFoundUsers(results);
    // STEP 6: Save the new offset
    setOffset(lastIndex);
    // STEP 7: Save the last item number
    setLast(lastIndex - 1);
  });

  // UseEffects
  useEffect(() => {
    fetchResults();
  }, [query]);

  useEffect(() => {
    if (!resultsEnd) {
      fetchResults(false);
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
