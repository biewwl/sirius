import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import { nameOrMe } from "../../helpers/mapDirectChats";
import useTimer from "../../hooks/useTimer";
import "./styles/ChatMessage.css";

function ChatMessage({ accountDataREDUX, messageData }) {
  const { nick } = accountDataREDUX;

  const {
    message,
    sender: { nick: senderNick, avatarUrl: senderAvatar },
    responding,
    date,
    id,
    options: { isSelected, haveSelected, selectMessage, showAvatar },
  } = messageData;
  const loggedMessageOwner = senderNick === nick;
  const messageStyle = loggedMessageOwner ? "--sent" : "--received";
  const selectedMessage = isSelected ? " --selected" : haveSelected;

  const [time, format] = useTimer(date);

  return (
    <section
      className={`chat-message ${messageStyle}${selectedMessage}`}
      onClick={() => selectMessage(id)}
    >
      {showAvatar && (
        <img
          src={senderAvatar}
          alt=""
          className="chat-message__avatar"
        />
      )}
      <div className={`chat-message__ballon`}>
        {responding && (
          <p className="chat-message__ballon__responding">
            <Icon
              icon="ion:arrow-undo-outline"
              className="chat-message__ballon__responding__icon"
            />
            <span className="chat-message__ballon__responding__name">
              {nameOrMe(nick, responding.sender.nick)}:
            </span>
            <span className="chat-message__ballon__responding__text">
              {responding.message}
            </span>
          </p>
        )}
        <p className={`chat-message__ballon__message`}>
          {message}
        </p>
      </div>
      <span className="chat-message__timer">{time} {format}</span>
    </section>
  );
}

const mapStateToProps = (state) => ({
  accountDataREDUX: state.userReducer.accountData,
  token: state.userReducer.token,
});

export default connect(mapStateToProps)(ChatMessage);

ChatMessage.propTypes = {
  token: PropTypes.string,
  accountDataREDUX: PropTypes.shape(),
  messageData: PropTypes.shape(),
};
