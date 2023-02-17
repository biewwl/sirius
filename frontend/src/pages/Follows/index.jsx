import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getFollows } from "../../helpers/fetch";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import CardUserProfileRow from "../../components/CardUserProfileRow";
import HeaderAndAside from "../../components/HeaderAndAside";
import { useInView } from "react-intersection-observer";
import CardUserProfileRowSkeleton from "../../components/CardUserProfileRow/skeleton";
import "./styles/Follows.css";
import SectionTitle from "../../components/SectionTitle";

function Follows({ type, token }) {
  // Route params
  const params = useParams();
  const { profile: nickProfile } = params;

  // Components States
  const [offset, setOffset] = useState(0);
  const [followsList, setFollowsList] = useState([]);
  const [resultsEnd, setResultsEnd] = useState(false);
  const [loading, setLoading] = useState(false);
  const limit = 10;
  const [last, setLast] = useState(limit - 1);

  // IntersectionObserver
  const opt = {
    root: null,
    rootMargin: "0px",
    threshold: 0.3,
  };
  const { ref, inView } = useInView(opt);

  // Fetch
  const fetchFollows = useCallback(async (fetchNew = true) => {
    // STEP 1: Verify if get news results or get more results
    let results;
    let lastIndex;
    if (fetchNew) {
      // STEP 2: Fetch new results
      setLoading(true);
      results = await getFollows(nickProfile, limit, 0, token, type);
      setLoading(false);
    } else {
      // STEP 2: Fetch more results
      const newResults = await getFollows(
        nickProfile,
        limit,
        offset,
        token,
        type
      );
      results = [...followsList, ...newResults];
    }
    // STEP 3: Saves the number of the last item to know the offset of the next one
    lastIndex = results.length;
    // STEP 4: If the last fetch brings less item than the limit, it means there are no more results
    if (results.length < limit) {
      setResultsEnd(true);
    }
    // STEP 5: Save the follows list
    setFollowsList(results);
    // STEP 6: Save the new offset
    setOffset(lastIndex);
    // STEP 7: Save the last item number
    setLast(lastIndex - 1);
  });

  const clearSetup = () => {
    setOffset(0);
    setLast(0);
    setResultsEnd(false);
    setFollowsList([]);
  };

  // UseEffects
  useEffect(() => {
    clearSetup();
    fetchFollows();
  }, [params]);

  useEffect(() => {
    if (!resultsEnd) {
      fetchFollows(false);
    }
  }, [inView]);

  const loadingsSkeleton = (qty) => {
    const loadingArray = [];
    for (let i = 0; i < qty; i += 1) {
      loadingArray.push("");
    }
    return loadingArray;
  };

  const list = loadingsSkeleton(4);

  const followIcon = {
    followers: "mdi:user-multiple-outline",
    following: "mdi:user-multiple-check-outline",
  };

  return (
    <div className="div-page">
      <HeaderAndAside />
      <div className="follows-page">
        <SectionTitle
          title={`${nickProfile} (${type})`}
          icon={followIcon[type]}
        />
        <div className="follows-cards">
          {loading
            ? list.map((_list, i) => {
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
