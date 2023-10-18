const Files = (sequelize, DATA_TYPE) => {
  const File = sequelize.define(
    "File",
    {
      id: {
        type: DATA_TYPE.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      fileUrl: {
        type: DATA_TYPE.STRING,
        field: "file_url",
        allowNull: false,
      },
      postId: {
        type: DATA_TYPE.INTEGER,
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
    },

    {
      timestamps: false,
      tableName: "files",
    }
  );

  File.associate = (models) => {
    models.File.belongsTo(models.User, {
      as: "fileOwner",
      through: "File",
      foreignKey: "userId",
    });
  }

  return File;
};

module.exports = Files;
