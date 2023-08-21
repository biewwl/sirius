const Messages = (sequelize, DATA_TYPE) => {
  const Message = sequelize.define(
    "Message",
    {
      id: {
        type: DATA_TYPE.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      message: {
        type: DATA_TYPE.STRING,
        allowNull: false,
        primaryKey: false,
      },
      senderId: {
        type: DATA_TYPE.INTEGER,
        allowNull: false,
        field: "sender_id",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: {
          model: "User",
          key: "id",
        },
      },
      seen: {
        type: DATA_TYPE.BOOLEAN,
        defaultValue: false,
      },
      excludeBySender: {
        type: DATA_TYPE.BOOLEAN,
        defaultValue: false,
      },
      respondingMessage: {
        type: DATA_TYPE.INTEGER,
        references: {
          model: "Message",
          key: "id",
        },
      },
      excludeByRecipient: {
        type: DATA_TYPE.BOOLEAN,
        defaultValue: false,
      },
      chatId: {
        type: DATA_TYPE.INTEGER,
        references: {
          model: "Chat",
          key: "id",
        },
      },
      date: {
        type: DATA_TYPE.DATE,
        defaultValue: DATA_TYPE.NOW,
      },
    },
    {
      timestamps: false,
      tableName: "messages",
    }
  );

  Message.associate = (models) => {
    models.Message.belongsTo(models.User, {
      as: "sender",
      through: "Message",
      foreignKey: "senderId",
    });
    models.Message.belongsTo(models.Chat, {
      as: "messageChat",
      foreignKey: "chatId",
    });
    models.Message.belongsTo(models.Message, {
      as: "responding",
      foreignKey: "respondingMessage",
    });
  };

  return Message;
};

module.exports = Messages;
