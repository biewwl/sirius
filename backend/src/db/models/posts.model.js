const Posts = (sequelize, DATA_TYPE) => {
  const Post = sequelize.define(
    "Post",
    {
      id: {
        type: DATA_TYPE.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: DATA_TYPE.INTEGER,
        allowNull: false,
        field: "user_id"
      },
      caption: {
        type: DATA_TYPE.STRING(300),
        allowNull: false,
      },
      date: {
        type: DATA_TYPE.DATE,
        defaultValue: DATA_TYPE.NOW,
      },
      imageUrl: {
        type: DATA_TYPE.STRING,
        allowNull: false,
        field: "image_url"
      },
      postViews: {
        type: DATA_TYPE.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: "post_views"
      },
    },
    {
      timestamps: false,
      tableName: "posts"
    }
  );

  Post.associate = (models) => {
    models.Post.belongsTo(models.User, {
      as: 'userPost',
      through: "Post",
      foreignKey: 'userId',
    });
  }

  return Post;
};

module.exports = Posts;
