const groupImage =
  "https://kinsta.com/pt/wp-content/uploads/sites/3/2022/03/google-cloud-market-share.jpeg";

export const mapDirectChats = (loggedUser, chats) => {
  const mappedChats = chats.map((chat) => {
    const { id, name, type, members, messages } = chat;
    let imageChat = groupImage;
    let nameChat = name;
    if (type === "private") {
      const anotherUser = members.find((member) => {
        const {
          User: { nick, name },
        } = member;
        nameChat = name;
        return nick !== loggedUser;
      });
      if (anotherUser) {
        imageChat = anotherUser.User.avatarUrl;
      }
      if (!anotherUser) {
        imageChat = members[0].User.avatarUrl;
      }
    }
    let message;
    const lastMessage = messages[messages.length - 1];
    if (lastMessage) {
      message = {
        text: lastMessage.message,
        sender: lastMessage.sender.nick,
      };
    } else message = null;

    return { id, nameChat, type, imageChat, message };
  });
  return mappedChats;
};

export const mapDirectMessages = (chat) => {
  const { messages } = chat;
  const mappedMessages = messages.map((currentMessage) => {
    const {
      message,
      responding,
      sender: { nick, avatarUrl },
      date,
      id,
    } = currentMessage;
    return {
      message,
      responding,
      sender: { nick, avatarUrl },
      date,
      id,
    };
  });

  return mappedMessages;
};

export const getImageFromChat = (chat, loggedUser) => {
  const { type, members } = chat;
  let imageChat = groupImage;
  let contactNick = "";
  let contactName = "";
  if (type === "private") {
    const anotherUser = members.find((member) => {
      const {
        User: { nick },
      } = member;
      return nick !== loggedUser;
    });
    if (anotherUser) {
      imageChat = anotherUser.User.avatarUrl;
      contactNick = anotherUser.User.nick;
      contactName = anotherUser.User.name;
    }
    if (!anotherUser) {
      imageChat = members[0].User.avatarUrl;
      contactNick = members[0].User.nick;
      contactName = members[0].User.name;
    }
  }

  return { imageChat, contactNick, contactName };
};

export const nameOrMe = (nick, name) => (name === nick ? "me" : name);

