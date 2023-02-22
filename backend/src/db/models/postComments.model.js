const PostsComments = (sequelize, DATA_TYPE) => {
  const PostComments = sequelize.define(
    "PostComments",
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
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        field: "post_id",
        references: {
          model: "Post",
          key: "id",
        },
      },
      userId: {
        type: DATA_TYPE.INTEGER,
        allowNull: false,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        field: "user_id",
        references: {
          model: "User",
          key: "id",
        },
      },
      comment: {
        type: DATA_TYPE.STRING(50),
        allowNull: false,
        defaultValue: 0,
        field: "comment"
      },
      date: {
        type: DATA_TYPE.DATE,
        defaultValue: DATA_TYPE.NOW,
      },
    },
    {
      timestamps: false,
      tableName: "posts_comments"
    }
  );

  PostComments.associate = (models) => {
    models.PostComments.belongsTo(models.User, {
      as: "userComment",
      through: "PostComments",
      foreignKey: "userId",
      otherKey: "postId",
    });
  };

  return PostComments;
};

module.exports = PostsComments;
