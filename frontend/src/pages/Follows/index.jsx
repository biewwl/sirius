import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import CardUserProfileRow from "../../components/CardUserProfileRow";
import HeaderAndAside from "../../components/HeaderAndAside";
import { useInView } from "react-intersection-observer";
import CardUserProfileRowSkeleton from "../../components/CardUserProfileRow/skeleton";
import loadingsQty from "../../helpers/loadingQty";
import filterUnblockedUsers from "../../helpers/filterUnblockedUsers";
import generateClassName from "../../helpers/generateClassBEM";
import "./styles/Follows.css";
import { listFollowers, listFollowing } from "../../helpers/fetch";

function Follows({ type, token }) {
  // Route params
  const params = useParams();
  const { profile: nick } = params;

  // Components States
  const [followsList, setFollowsList] = useState([]);
  const [endResults, setEndResults] = useState(false);
  const [loading, setLoading] = useState(false);

  // IntersectionObserver
  const opt = {
    root: null,
    rootMargin: "0px",
    threshold: 1,
  };
  const { ref, inView } = useInView(opt);
  const limit = 1;

  const fetchResults = async (NEW = true) => {
    const offset = NEW ? 0 : followsList.length;
    const options = { nick, limit, offset, token };

    const results =
      type === "following"
        ? await listFollowing(options)
        : await listFollowers(options);

    if (results.length === 0) {
      setEndResults(true);
    } else {
      setEndResults(false);
    }
    if (!NEW) return setFollowsList([...followsList, ...results]);
    setFollowsList(results);
  };

  const clearSetup = () => {
    setEndResults(false);
    setFollowsList([]);
  };

  // UseEffects
  useEffect(() => {
    clearSetup();
    const getFollows = async () => {
      setLoading(true);
      await fetchResults(true);
      setLoading(false);
    };
    getFollows();
  }, [params]);

  if (inView && !endResults) fetchResults(false);
  const loadingList = loadingsQty(4);
  const unblockedUsers = filterUnblockedUsers(followsList);
  const last = unblockedUsers.length - 1;

  const primaryClassName = "follows-page";
  const customClassName = generateClassName(primaryClassName);

  return (
    <div className="div-page">
      <HeaderAndAside />
      <div className={primaryClassName}>
        <div
          className={customClassName("cards")}
          ref={followsList.length > 0 ? null : ref}
        >
          {loading
            ? loadingList.map((_list, i) => {
                return <CardUserProfileRowSkeleton key={i} />;
              })
            : unblockedUsers.map((follow, i) => {
                const refElement = i === last ? ref : null;
                return (
                  <div
                    ref={refElement}
                    key={i}
                    className={customClassName("cards__card")}
                  >
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
