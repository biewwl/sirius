import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import CardUserProfileRow from "../../components/CardUserProfileRow";
import HeaderAndAside from "../../components/HeaderAndAside";
import { useInView } from "react-intersection-observer";
import CardUserProfileRowSkeleton from "../../components/CardUserProfileRow/skeleton";
import "./styles/Follows.css";
import fetchPaginate from "../../helpers/fetchPaginate";
import loadingsQty from "../../helpers/loadingQty";

function Follows({ type, token }) {
  // Route params
  const params = useParams();
  const { profile: nickProfile } = params;

  // Components States
  const [offset, setOffset] = useState(0);
  const [followsList, setFollowsList] = useState([]);
  const [resultsEnd, setResultsEnd] = useState(false);
  const [loading, setLoading] = useState(false);
  const limit = 3;
  const [last, setLast] = useState(limit - 1);

  // IntersectionObserver
  const opt = {
    root: null,
    rootMargin: "0px",
    threshold: 1,
  };
  const { ref, inView } = useInView(opt);
  //

  const fetchResults = async (NEW = true, OFFSET = offset) => {
    console.log(OFFSET);
    const url = `${type}/${nickProfile}`;
    const op = "?";
    const newResults = await fetchPaginate({
      limit,
      offset: OFFSET,
      token,
      url,
      op,
    });
    const results = NEW ? newResults : [...followsList, ...newResults];
    const nextOffset = results.length;
    if (newResults.length < limit) setResultsEnd(true);
    setFollowsList(results);
    setOffset(nextOffset);
    setLast(nextOffset - 1);
  };

  const clearSetup = () => {
    setOffset(0);
    setLast(0);
    setResultsEnd(false);
    setFollowsList([]);
  };

  // UseEffects
  useEffect(() => {
    clearSetup();
    const getFollows = async () => {
      setLoading(true);
      await fetchResults(true, 0);
      setLoading(false);
    };
    getFollows();
  }, [params]);

  if (inView && !resultsEnd) fetchResults(false);
  const loadingList = loadingsQty(4);

  return (
    <div className="div-page">
      <HeaderAndAside />
      <div className="follows-page">
        <div className="follows-cards">
          {loading
            ? loadingList.map((_list, i) => {
                return <CardUserProfileRowSkeleton key={i} />;
              })
            : followsList.map((follow, i) => {
                const refElement = i === last ? ref : null;
                return (
                  <div ref={refElement} key={i} className="ref-container">
                    <CardUserProfileRow userData={follow} />
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  token: state.userReducer.token,
});

export default connect(mapStateToProps)(Follows);

Follows.propTypes = {
  token: PropTypes.string,
  dispatch: PropTypes.func,
  type: PropTypes.string,
};
