import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./styles/Stories.css";

const stories = [
  {
    imageUrl:
      "https://static.poder360.com.br/2021/08/messi-contrato-barcelona.jpg",
    date: "",
    userUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Lionel_Messi_WC2022.jpg/640px-Lionel_Messi_WC2022.jpg",
    userName: "Lionel Messi",
  },
  {
    imageUrl:
      "https://media.fashionnetwork.com/m/c5fd/4ba6/722f/8e46/4519/07a6/f2c0/6589/3983/08a3/08a3.jpg",
    date: "",
    userUrl: "https://bk.ibxk.com.br/2022/01/27/27144706197336.jpg",
    userName: "Shein",
  },
  {
    imageUrl:
      "https://hips.hearstapps.com/digitalspyuk.cdnds.net/16/21/1464170390-avengers.jpg",
    date: "",
    userUrl:
      "https://media-cldnry.s-nbcnews.com/image/upload/t_nbcnews-fp-1200-630,f_auto,q_auto:best/newscms/2019_17/2835276/190425-thor-avengers-endgame-ew-339p.jpg",
    userName: "Lionel Messi",
  },
  {
    imageUrl:
      "https://media.wired.com/photos/5926ff22f3e2356fd800b20a/master/w_2560%2Cc_limit/Gboard.gif",
    date: "",
    userUrl:
      "http://expresswriters.com/wp-content/uploads/2015/09/google-new-logo-450x450.jpg",
    userName: "Google",
  },
  {
    imageUrl:
      "https://thumbs.gfycat.com/AdmiredPositiveAiredaleterrier-size_restricted.gif",
    date: "",
    userUrl:
      "https://s2.glbimg.com/0kj0OG49M5BmHMeOXlKOMP0BZ4E=/0x0:1080x1072/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_ba3db981e6d14e54bb84be31c923b00c/internal_photos/bs/2022/H/E/HWE1OzQH6dLthAVSe5cg/jenna-ortega.jpg",
    userName: "Jenna Ortega",
  },
  {
    imageUrl: "https://s3.amazonaws.com/bit-photos/large/14449365.jpeg",
    date: "",
    userUrl: "https://i.scdn.co/image/ab6761610000e5eb1fd54eb6e30d0bc8f633621e",
    userName: "Machine Gun Kelly",
  },
  {
    imageUrl:
      "https://hips.hearstapps.com/digitalspyuk.cdnds.net/16/21/1464170390-avengers.jpg",
    date: "",
    userUrl:
      "https://media-cldnry.s-nbcnews.com/image/upload/t_nbcnews-fp-1200-630,f_auto,q_auto:best/newscms/2019_17/2835276/190425-thor-avengers-endgame-ew-339p.jpg",
    userName: "Machine Gun Kelly",
  },
  {
    imageUrl:
      "https://hips.hearstapps.com/digitalspyuk.cdnds.net/16/21/1464170390-avengers.jpg",
    date: "",
    userUrl:
      "https://media-cldnry.s-nbcnews.com/image/upload/t_nbcnews-fp-1200-630,f_auto,q_auto:best/newscms/2019_17/2835276/190425-thor-avengers-endgame-ew-339p.jpg",
    userName: "Machine Gun Kelly",
  },
];

function Stories() {
  return (
    <section className="stories">
      {stories.map((story, key) => (
        <section key={key} className="story">
          <div className="story__content">
            <img
              src={story.imageUrl}
              alt=""
              className="story__content__preview"
            />
          </div>
          <section className="story__owner">
            <img src={story.userUrl} alt="" className="story__owner__avatar" />
            <span className="story__owner__name">{story.userName}</span>
          </section>
        </section>
      ))}
    </section>
  );
}

export default connect()(Stories);

Stories.propTypes = {
  stories: PropTypes.shape(),
};
