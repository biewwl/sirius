import React, { useEffect, useState } from "react";
import { loggedChats } from "../../helpers/requests/GET/chats";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { mapDirectChats, nameOrMe } from "../../helpers/mapDirectChats";
import { Link } from "react-router-dom";
import config from "../../app_config.json";
import { socket } from "../../socket";
import "./styles/ChatsList.css";

function ChatsList({ token, accountDataREDUX }) {
  const [chats, setChats] = useState([]);
  const { direct } = config["app.routes"];
  const [customLinkDirect] = direct.split("/:");

  const { nick } = accountDataREDUX;

  const fetchChats = async () => {
    const userChats = await loggedChats(token);
    setChats(mapDirectChats(nick, userChats));
  };

  useEffect(() => {
    fetchChats();
  }, [nick]);

  socket.on("chat message", function () {
    fetchChats();
  });

  return (
    <aside className="chats">
      <div className="chats__content">
        <p className="chats__content__title">Chats</p>
        {chats.map((chat, i) => {
          const { imageChat, nameChat, message, id, type } = chat;

          const isPrivate = type === "private";

          const avatarClassName = isPrivate
            ? "chats__content__link__image --private"
            : "chats__content__link__image --group";

          return (
            <Link
              to={`${customLinkDirect}/${id}`}
              key={i}
              className="chats__content__link"
            >
              <img src={imageChat} alt="" className={avatarClassName} />
              <div className="chats__content__link__info">
                <h4 className="chats__content__link__info__name">{nameChat}</h4>
                <p className="chats__content__link__info__message">
                  {message && (
                    <>
                      <span className="chats__content__link__info__message__sender">
                        {nameOrMe(nick, message.sender)}:
                      </span>
                      <span className="chats__content__link__info__message__text">
                        {message.text}
                      </span>
                    </>
                  )}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}

const mapStateToProps = (state) => ({
  accountDataREDUX: state.userReducer.accountData,
  token: state.userReducer.token,
});

export default connect(mapStateToProps)(ChatsList);

ChatsList.propTypes = {
  token: PropTypes.string,
  accountDataREDUX: PropTypes.shape(),
};
