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
      name: {
        type: DATA_TYPE.STRING,
        allowNull: false,
      },
      folder: {
        type: DATA_TYPE.STRING,
        allowNull: false,
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
