import React, { useEffect, useState } from "react";
import HeaderAndAside from "../../components/HeaderAndAside";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Icon } from "@iconify/react";
import { Link, useParams } from "react-router-dom";
import ChatsList from "../../components/ChatsList";
import { chatMessages } from "../../helpers/requests/GET/chats";
import {
  getImageFromChat,
  mapDirectMessages,
} from "../../helpers/mapDirectChats";
import ChatMessage from "../../components/ChatMessage";
import { createMessage } from "../../helpers/requests/POST/chats";
import { socket } from "../../socket";
import "./styles/Direct.css";
import "./styles/Direct-mobile.css";

function Direct({ token, accountDataREDUX }) {
  const { nick, avatarUrl } = accountDataREDUX;
  const [allMessages, setAllMessages] = useState([]);
  const [contact, setContact] = useState({});
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [chatType, setChatType] = useState("private");
  const [chatName, setChatName] = useState("");
  const [isResponding, setIsResponding] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const { chatId } = useParams();

  const { imageChat, contactNick, contactName } = contact;

  const selectMessage = (messageId) => {
    let newSelected = selectedMessages;
    if (selectedMessages.some((id) => id === messageId)) {
      newSelected = selectedMessages.filter((id) => id !== messageId);
    } else {
      newSelected = [...newSelected, messageId];
    }
    setIsResponding(false);
    setSelectedMessages(newSelected);
  };

  const handleClickResponding = () => {
    setIsResponding(!isResponding);
  };

  const fetchMessages = async () => {
    const chat = await chatMessages(token, Number(chatId));

    setAllMessages(mapDirectMessages(chat));
    setContact(getImageFromChat(chat, nick));
    setChatType(chat.type);
    setChatName(chat.name);
    setSelectedMessages([]);
  };

  useEffect(() => {
    fetchMessages();
  }, [nick, chatId]);

  const isPrivate = chatType === "private";
  const haveSelected = selectedMessages.length > 0;

  const classNameWithType = (className) =>
    `${className} ${isPrivate ? "--private" : "--group"}`;

  const respondingMessage = () => {
    if (respondingMessage) {
      const [messageId] = selectedMessages;
      const message = allMessages.find(
        (messageData) => messageData.id === messageId
      );
      const messageText = message.message;
      const sender = message.sender.nick === nick ? "me" : message.sender.nick;
      return { messageText, sender };
    }
    return { messageText: "", sender: "" };
  };

  const handleInputChange = ({ target }) => {
    setInputMessage(target.value);
    socket.emit("chat typing", { status: true, nick });
    setTimeout(() => {
      socket.emit("chat typing", { status: false, nick });
    }, 2000);
  };

  const onSubmitMessage = async (e) => {
    e.preventDefault();
    let respondingId = null;
    if (isResponding) respondingId = selectedMessages[0];
    const message = await createMessage(token, {
      respondingMessage: respondingId,
      message: inputMessage,
      chatId,
    });
    setInputMessage("");
    setSelectedMessages([]);
    setIsResponding(false);
    socket.emit("chat message");
    return message;
  };

  socket.on("chat message", function () {
    fetchMessages();
  });

  socket.on("chat typing", function (typing) {
    setIsTyping(typing);
  });

  const otherUserTyping = isTyping.status && isTyping.nick === contactNick;

  return (
    <div className="div-page">
      <HeaderAndAside />
      <main className="direct">
        <section className="direct__control">
          <div className="direct__control__left-content">
            <Link
              to="/direct"
              className="direct__control__left-content__close-icon"
            >
              <Icon icon="gg:close" />
            </Link>
            <section className="direct__control__left-content__info">
              <img
                src={imageChat}
                alt=""
                className={classNameWithType(
                  "direct__control__left-content__info__image"
                )}
              />
              <div className="direct__control__left-content__info__name-and-online">
                <p>{isPrivate ? contactName : chatName}</p>
                {isPrivate && (
                  <p className="direct__control__left-content__info__name-and-online__online">
                    {otherUserTyping ? "typing..." : "online"}
                  </p>
                )}
              </div>
            </section>
          </div>
          <div className="direct__control__right-content">
            {haveSelected && selectedMessages.length === 1 && (
              <label htmlFor="input-message">
                <Icon
                  icon="ion:arrow-undo-outline"
                  className="direct__control__right-content__responding-icon"
                  onClick={handleClickResponding}
                />
              </label>
            )}
            {haveSelected && (
              <Icon
                icon="ant-design:delete-outlined"
                className="direct__control__right-content__trash-icon"
              />
            )}
            <Icon
              icon="ri:settings-line"
              className="direct__control__right-content__settings-icon"
            />
          </div>
        </section>
        <section className="direct__messages">
          <section className="direct__messages__header">
            <div>
              {isPrivate && (
                <>
                  <Link
                    to={`/p/${nick}`}
                    className={classNameWithType(
                      "direct__messages__header__user"
                    )}
                  >
                    <img
                      src={avatarUrl}
                      alt=""
                      className="direct__messages__header__user__avatar --sender"
                    />
                  </Link>
                  <Link
                    to={`/p/${contactNick}`}
                    className={classNameWithType(
                      "direct__messages__header__user"
                    )}
                  >
                    <img
                      src={imageChat}
                      alt=""
                      className="direct__messages__header__user__avatar --recipient"
                    />
                  </Link>
                </>
              )}
              {!isPrivate && (
                <div
                  className={classNameWithType(
                    "direct__messages__header__user"
                  )}
                >
                  <img
                    src={imageChat}
                    alt=""
                    className="direct__messages__header__user__avatar --recipient"
                  />
                </div>
              )}
            </div>
            {isPrivate && (
              <p className="direct__messages__header__text">
                This is the beginning of your conversations with{" "}
                <Link
                  to={`/p/${contactNick}`}
                  className="direct__messages__header__text__link"
                >
                  {contactName}
                </Link>
                . All your conversations are private and encrypted.
              </p>
            )}
            {!isPrivate && (
              <p className="direct__messages__header__text">
                This is the beginning of your conversations with the group{" "}
                <span className="direct__messages__header__text__link">
                  {chatName}
                </span>
                . All your conversations are private and encrypted.
              </p>
            )}
          </section>
          {allMessages.map((messageData, i) => {
            const {
              sender: { nick: senderNick },
              id,
            } = messageData;
            const nextMessage = allMessages[i - 1];
            let showAvatar = true;
            if (nextMessage) {
              if (nextMessage.sender.nick === senderNick) showAvatar = false;
            }
            const isSelected = selectedMessages.some(
              (messageId) => messageId === id
            );
            const haveSelected =
              selectedMessages.length > 0 ? " --no-selected" : "";
            return (
              <ChatMessage
                key={i}
                messageData={{
                  ...messageData,
                  options: {
                    isSelected,
                    haveSelected,
                    selectMessage,
                    showAvatar,
                  },
                }}
              />
            );
          })}
        </section>
        <form className="direct__actions" onSubmit={onSubmitMessage}>
          {isResponding && (
            <section className="direct__actions__responding">
              <Icon
                icon="ion:arrow-undo-outline"
                className="direct__actions__responding__icon"
              />
              <p className="direct__actions__responding__text">
                <span className="direct__actions__responding__text__sender">
                  {respondingMessage().sender}:
                </span>
                <span className="direct__actions__responding__message">
                  {respondingMessage().messageText}
                </span>
              </p>
            </section>
          )}
          <div className="direct__actions__send">
            <input
              type="text"
              onChange={handleInputChange}
              value={inputMessage}
              id="input-message"
              className="direct__actions__send__input"
              placeholder="Type a message..."
            />
            <Icon
              icon="iconamoon:send-light"
              className="direct__actions__send__send-btn"
            />
          </div>
        </form>
      </main>
      <ChatsList />
    </div>
  );
}

const mapStateToProps = (state) => ({
  accountDataREDUX: state.userReducer.accountData,
  token: state.userReducer.token,
});

export default connect(mapStateToProps)(Direct);

Direct.propTypes = {
  token: PropTypes.string,
  accountDataREDUX: PropTypes.shape(),
};
