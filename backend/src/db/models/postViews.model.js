const PostsViews = (sequelize, DATA_TYPE) => {
  const PostViews = sequelize.define(
    "PostViews",
    {
      postId: {
        type: DATA_TYPE.INTEGER,
        allowNull: false,
        primaryKey: true,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        field: "post_id",
        references: {
          model: "Post",
          key: "id",
        },
      },
      views: {
        type: DATA_TYPE.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: "views"
      },
    },
    {
      timestamps: false,
      tableName: "posts_views"
    }
  );

  return PostViews;
};

module.exports = PostsViews;
