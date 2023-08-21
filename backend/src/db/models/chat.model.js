const Chats = (sequelize, DataTypes) => {
  const Chat = sequelize.define(
    "Chat",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      type: {
        type: DataTypes.ENUM("private", "group"),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
      tableName: "chats",
    }
  );

  Chat.associate = (models) => {
    Chat.hasMany(models.ChatMember, {
      foreignKey: 'chatId',
      as: 'members',
    });
    Chat.hasMany(models.Message, {
      foreignKey: 'chatId',
      as: 'messages',
    });
  };

  return Chat;
};

module.exports = Chats;
