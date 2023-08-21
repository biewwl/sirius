const { Chat, ChatMember, User, Message } = require("../db/models");

const getChatsByUserId = async (userId) => {
  const chatMembers = await ChatMember.findAll({
    where: { userId },
    attributes: ["chatId"],
  });

  const chatIds = chatMembers.map((member) => member.chatId);

  const userChats = await Chat.findAll({
    where: {
      id: chatIds,
    },
    include: [
      {
        model: ChatMember,
        as: "members",
        include: [
          {
            model: User,
            attributes: {
              exclude: ["password", "email"],
            },
          },
        ],
      },
      {
        model: Message,
        as: "messages",
        attributes: {
          exclude: ["chatId", "senderId", "respondingMessage"],
        },
        include: [
          {
            model: User,
            attributes: {
              exclude: ["password", "email"],
            },
            as: "sender",
          },
          {
            model: Message,
            as: "responding",
            attributes: ["message"],
            include: [
              {
                model: User,
                attributes: ["nick"],
                as: "sender",
              },
            ],
          },
        ],
      },
    ],
  });

  return userChats;
};

const getChatById = async (chatId) => {
  const chat = await Chat.findOne({
    where: {
      id: chatId,
    },
    include: [
      {
        model: ChatMember,
        as: "members",
        include: [
          {
            model: User,
            attributes: {
              exclude: ["password", "email"],
            },
          },
        ],
      },
      {
        model: Message,
        as: "messages",
        attributes: {
          exclude: ["chatId", "senderId", "respondingMessage"],
        },
        include: [
          {
            model: User,
            attributes: {
              exclude: ["password", "email"],
            },
            as: "sender",
          },
          {
            model: Message,
            as: "responding",
            attributes: ["message"],
            include: [
              {
                model: User,
                attributes: ["nick"],
                as: "sender",
              },
            ],
          },
        ],
      },
    ],
  });

  if (chat) {
    return chat;
  }

  return null;
};

const getPrivateChatByUsersIds = async (userId1, userId2) => {
  const loggedChats = await getChatsByUserId(userId1);
  const [filteredChats] = loggedChats.filter((chat) => {
    const { members, type } = chat;
    const includeUserId2 = members.some((member) => member.userId === userId2);
    const includeOther = members.some(
      (member) => member.userId !== userId1 && member.userId !== userId2
    );
    const typePrivate = type === "private";
    return includeUserId2 && !includeOther && typePrivate;
  });
  if (!filteredChats) return null;
  return filteredChats;
};

const getMessageId = async (messageId) => {
  const userChats = await Message.findByPk(messageId, {
    include: [
      {
        model: Message,
        as: "responding",
        attributes: ["message"],
        include: [
          {
            model: User,
            attributes: ["nick"],
            as: "sender",
          },
        ],
      },
    ],
  });

  return userChats;
};

const createChat = async ({ type, name, chatMembers }) => {
  const createdChat = await Chat.create({
    type,
    name,
  });

  if (chatMembers.length > 1) {
    await Promise.all(
      chatMembers.map(async (memberId) => {
        const createdMember = await ChatMember.create({
          userId: memberId,
          chatId: createdChat.id,
        });
        return createdMember;
      })
    );
  }

  const chat = await getChatById(createdChat.id);

  return chat;
};

const createMessage = async ({
  chatId,
  message,
  senderId,
  respondingMessage,
}) => {
  const createdMessage = await Message.create({
    chatId,
    message,
    senderId,
    respondingMessage,
  });

  return createdMessage;
};

module.exports = {
  getChatsByUserId,
  getChatById,
  getPrivateChatByUsersIds,
  getMessageId,
  createChat,
  createMessage
};
