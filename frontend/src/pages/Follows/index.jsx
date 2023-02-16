import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./styles/Follows.css";
import { getFollows } from "../../helpers/fetch";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import CardUserProfileRow from "../../components/CardUserProfileRow";
import Header from "../../components/Header";

function Follows({ type, token }) {
  const [followsList, setFollowsList] = useState([]);
  const params = useParams();

  const { profile } = useParams();

  useEffect(() => {
    const setFollows = async () => {
      const fetchFollows = await getFollows(profile, token, type);
      setFollowsList(fetchFollows);
    };
    setFollows();
  }, [params]);

  return (
    <>
      <Header />
      <div className="follows-page">
        <div className="follows-cards">
          {followsList.map((follow, i) => {
            return <CardUserProfileRow key={i} userData={follow} />;
          })}
        </div>
      </div>
    </>
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
