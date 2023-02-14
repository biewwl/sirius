const FollowModel = (sequelize, DATA_TYPE) => {
  const Follow = sequelize.define(
    "Follow",
    {
      id: {
        type: DATA_TYPE.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      senderId: {
        type: DATA_TYPE.INTEGER,
        allowNull: false,
        field: "sender_id",
      },
      receiverId: {
        type: DATA_TYPE.INTEGER,
        allowNull: false,
        field: "receiver_id",
      },
      date: {
        type: DATA_TYPE.DATE,
        defaultValue: new Date(),
      },
    },
    {
      timestamps: false,
      tableName: "follows"
    }
  );

  Follow.associate = (models) => {
    models.Follow.belongsTo(models.User, {
      as: 'followers',
      through: "Follow",
      foreignKey: 'senderId',
      otherKey: 'receiverId',
    });
    models.Follow.belongsTo(models.User, {
      as: 'following',
      through: "Follow",
      foreignKey: 'receiverId',
      otherKey: 'senderId',
    });
  };

  return Follow;
};

module.exports = FollowModel;
