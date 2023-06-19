const Stories = (sequelize, DATA_TYPE) => {
  const Story = sequelize.define(
    "Story",
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
      date: {
        type: DATA_TYPE.DATE,
        defaultValue: DATA_TYPE.NOW,
      },
      contentUrl: {
        type: DATA_TYPE.STRING,
        allowNull: false,
        field: "content_url",
      },
    },
    {
      timestamps: false,
      tableName: "stories",
    }
  );

  Story.associate = (models) => {
    models.Story.belongsTo(models.User, {
      as: "userStory",
      through: "Story",
      foreignKey: "userId",
    });
    // models.Story.hasOne(models.StoryViews, {
    //   as: "postViews",
    //   foreignKey: "postId"
    // });
    // models.Story.hasMany(models.StoryLikes, {
    //   as: "postLikes",
    //   foreignKey: "postId"
    // });
  };

  return Story;
};

module.exports = Stories;
