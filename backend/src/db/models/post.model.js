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
        field: "user_id",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: {
          model: "User",
          key: "id",
        },
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
        field: "image_url",
      },
    },
    {
      timestamps: false,
      tableName: "posts",
    }
  );

  Post.associate = (models) => {
    models.Post.belongsTo(models.User, {
      as: "userPost",
      through: "Post",
      foreignKey: "userId",
    });
    // models.Post.hasOne(models.PostViews, {
    //   as: "postViews",
    //   foreignKey: "postId"
    // });
    // models.Post.hasMany(models.PostLikes, {
    //   as: "postLikes",
    //   foreignKey: "postId"
    // });
    // models.Post.hasMany(models.PostComments, {
    //   as: "postComments",
    //   foreignKey: "postId"
    // });
    // models.Post.hasMany(models.PostShares, {
    //   as: "postShares",
    //   foreignKey: "postId"
    // });
    // models.Post.hasMany(models.PostSaved, {
    //   as: "postSaved",
    //   foreignKey: "postId"
    // });
  };

  return Post;
};

module.exports = Posts;
