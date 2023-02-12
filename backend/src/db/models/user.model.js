const UserModel = (sequelize, DATA_TYPE) => {
  const User = sequelize.define(
    "users",
    {
      id: {
        type: DATA_TYPE.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DATA_TYPE.STRING(30),
        allowNull: false,
      },
      nick: {
        type: DATA_TYPE.STRING(20),
        allowNull: false,
        primaryKey: true,
      },
      email: {
        type: DATA_TYPE.STRING(30),
        allowNull: false,
      },
      password: {
        type: DATA_TYPE.STRING(50),
        allowNull: false,
      },
      avatarUrl: {
        type: DATA_TYPE.STRING,
        field: "avatar_url"
      },
      coverUrl: {
        type: DATA_TYPE.STRING,
        field: "cover_url"
      },
    },
    {
      timestamps: false,
    }
  );
  return User;
}


module.exports = UserModel;
