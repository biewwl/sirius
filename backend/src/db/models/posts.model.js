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
        defaultValue: new Date(),
      },
      imageUrl: {
        type: DATA_TYPE.STRING,
        allowNull: false,
      },
      postViews: {
        type: DATA_TYPE.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      timestamps: false,
      tableName: "users"
    }
  );

  return Post;
};

module.exports = Posts;
