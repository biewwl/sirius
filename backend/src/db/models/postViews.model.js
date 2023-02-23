const PostsViews = (sequelize, DATA_TYPE) => {
  const PostViews = sequelize.define(
    "PostViews",
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
      tableName: "posts_views"
    }
  );

  PostViews.associate = (models) => {
    models.PostViews.belongsTo(models.User, {
      as: "userView",
      through: "PostViews",
      foreignKey: "userId",
    });
  };

  return PostViews;
};

module.exports = PostsViews;
