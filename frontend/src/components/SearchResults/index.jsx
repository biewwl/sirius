import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { userBlockedData } from "../../mocks/userData";
import CardUserProfileRow from "../CardUserProfileRow";
import { connect } from "react-redux";
import { useInView } from "react-intersection-observer";
import fetchPaginate from "../../helpers/fetchPaginate";
import "./styles/SearchResults.css";
import "./styles/SearchResults-mobile.css";
import filterUnblockedUsers from "../../helpers/filterUnblockedUsers";

function SearchResults({ query, token }) {
  const params = useParams();

  // IntersectionObserver
  const opt = {
    root: null,
    rootMargin: "0px",
    threshold: 1,
  };
  const { ref, inView } = useInView(opt);

  const [searchResults, setSearchResults] = useState([]);
  const [endResults, setEndResults] = useState(false);

  const fetchResults = async (NEW = true) => {
    const url = `search?query=${query}`;
    const op = "&";
    const offset = NEW ? 0 : searchResults.length;
    const results = await fetchPaginate({
      url,
      op,
      limit: 1,
      offset,
      token,
    });
    if (results.length === 0) return setEndResults(true);
    if (!NEW) return setSearchResults([...searchResults, ...results]);
    setSearchResults(results);
    setEndResults(false);
  };

  useEffect(() => {
    fetchResults();
  }, [params, query]);

  if (inView && !endResults) fetchResults(false);
  const unblockedUsers = filterUnblockedUsers(searchResults);
  const last = unblockedUsers.length - 1;

  return (
    <aside
      className="search-results"
      ref={searchResults.length > 0 ? null : ref}
    >
      {unblockedUsers.map((user, i) => {
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
