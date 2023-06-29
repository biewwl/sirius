import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import CardUserProfileRow from "../../components/CardUserProfileRow";
import HeaderAndAside from "../../components/HeaderAndAside";
import { useInView } from "react-intersection-observer";
import CardUserProfileRowSkeleton from "../../components/CardUserProfileRow/skeleton";
import "./styles/Follows.css";
import fetchPaginate from "../../helpers/fetchPaginate";
import loadingsQty from "../../helpers/loadingQty";
import filterUnblockedUsers from "../../helpers/filterUnblockedUsers";
import generateClassName from "../../helpers/generateClassBEM";
import { getProfileData } from "../../helpers/fetch";
import UserAvatarStory from "../../components/UserAvatarStory";

function Follows({ type, token }) {
  // Route params
  const params = useParams();
  const { profile: nickProfile } = params;
  const navigate = useNavigate();

  // Components States
  const [followsList, setFollowsList] = useState([]);
  const [userData, setUserData] = useState({});
  const [endResults, setEndResults] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [pagePending, setPagePending] = useState(false);

  // IntersectionObserver
  const opt = {
    root: null,
    rootMargin: "0px",
    threshold: 1,
  };
  const { ref, inView } = useInView(opt);

  const fetchResults = async (NEW = true) => {
    const url = `${type}/${nickProfile}`;
    const op = "?";
    const offset = NEW ? 0 : followsList.length;
    const results = await fetchPaginate({
      limit: 1,
      offset,
      token,
      url,
      op,
    });
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
    const getUserData = async () => {
      try {
        const fetchData = await getProfileData(token, nickProfile);
        const { error } = fetchData;
        if (error) {
          console.log("error", fetchData);
          navigate("/404");
        }
        setUserData(fetchData);
      } catch (e) {
        return {};
      }
    };
    const getFollows = async () => {
      setLoading(true);
      await fetchResults(true);
      setLoading(false);
    };
    getUserData();
    getFollows();
  }, [params]);

  if (inView && !endResults) fetchResults(false);
  const loadingList = loadingsQty(4);
  const unblockedUsers = filterUnblockedUsers(followsList);
  const last = unblockedUsers.length - 1;

  const primaryClassName = "follows-page";
  const customClassName = generateClassName(primaryClassName);

  const { name, nick, avatarUrl } = userData;

  return (
    <div className="div-page">
      <HeaderAndAside />
      <div className={primaryClassName}>
        {/* <button>Pending Requests</button> */}
        {name && (
          <section className={customClassName("user-identify")}>
            <UserAvatarStory avatarUrl={avatarUrl} nick={nick} size="50" />
            <Link to={`/p/${nick}`}>
              <h3 className={customClassName("user-identify__name")}>
                {name}&apos;s{" "}
                <span className={customClassName("user-identify__name_type")}>
                  {type}
                </span>
              </h3>
            </Link>
          </section>
        )}
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
