const PostsShares = (sequelize, DATA_TYPE) => {
  const PostShares = sequelize.define(
    "PostShares",
    {
      id: {
        type: DATA_TYPE.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      postId: {
        type: DATA_TYPE.INTEGER,
        allowNull: false,
        field: "post_id",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: {
          model: "Post",
          key: "id",
        },
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
      recipientId: {
        type: DATA_TYPE.INTEGER,
        allowNull: false,
        field: "recipient_id",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: {
          model: "User",
          key: "id",
        },
      },
    },
    {
      timestamps: false,
      tableName: "posts_shares",
    }
  );

  PostShares.associate = (models) => {
    models.PostShares.belongsTo(models.User, {
      through: "PostShares",
      foreignKey: "recipientId",
    });
    models.PostShares.belongsTo(models.User, {
      through: "PostShares",
      foreignKey: "senderId",
    });
  };

  return PostShares;
};

module.exports = PostsShares;
