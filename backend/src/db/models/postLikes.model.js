const PostsLikes = (sequelize, DATA_TYPE) => {
  const PostLikes = sequelize.define(
    "PostLikes",
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
      userId: {
        type: DATA_TYPE.INTEGER,
        allowNull: false,
        field: "user_id",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: {
          model: "User",
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
      tableName: "posts_likes",
    }
  );

  PostLikes.associate = (models) => {
    models.PostLikes.belongsTo(models.User, {
      as: "userLike",
      through: "PostLikes",
      foreignKey: "userId",
    });
  };

  return PostLikes;
};

module.exports = PostsLikes;
