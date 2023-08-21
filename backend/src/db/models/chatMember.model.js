const ChatMembers = (sequelize, DataTypes) => {
  const ChatMember = sequelize.define(
    "ChatMember",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "user_id",
      },
      chatId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "chat_id",
      },
    },
    {
      timestamps: false,
      tableName: "chat_members",
    }
  );
  
  ChatMember.associate = (models) => {
    models.ChatMember.belongsTo(models.User, {
      foreignKey: "userId",
    });
    models.ChatMember.belongsTo(models.Chat, {
      foreignKey: "chatId",
    });
  };

  return ChatMember;
};

module.exports = ChatMembers;
