const BlockModel = (sequelize, DATA_TYPE) => {
  const Block = sequelize.define(
    "Block",
    {
      id: {
        type: DATA_TYPE.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      blockerId: {
        type: DATA_TYPE.INTEGER,
        allowNull: false,
        field: "blocker_id",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: {
          model: "User",
          key: "id",
        },
      },
      blockedId: {
        type: DATA_TYPE.INTEGER,
        allowNull: false,
        field: "blocked_id",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: {
          model: "User",
          key: "id",
        },
      },
      date: {
        type: DATA_TYPE.DATE,
        defaultValue: new Date(),
      },
    },
    {
      timestamps: false,
      tableName: "blocks"
    }
  );

  Block.associate = (models) => {
    models.Block.belongsTo(models.User, {
      as: 'blocker',
      through: "Block",
      foreignKey: 'blockerId',
      otherKey: 'blockedId',
    });
    models.Block.belongsTo(models.User, {
      as: 'blocked',
      through: "Block",
      foreignKey: 'blockedId',
      otherKey: 'blockerId',
    });
  };

  return Block;
};

module.exports = BlockModel;
