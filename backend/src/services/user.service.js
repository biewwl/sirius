const { User } = require("../db/models");
const md5 = require("md5");
const generateToken = require("../utils/generateToken");
const statusCode = require("../utils/statusCode");

///////////////////////////////
///// GET USER IN DATABASE ////
///////////////////////////////

// Generic function to get user in database by any field (without sensitive content)
const getUserBy = async (field, value, exclude = []) => {
  const user = await User.findOne({
    where: { [field]: value },
    attributes: { exclude: ["email", "password", ...exclude] },
  });
  if (!user) return null;

  return user.dataValues;
};

// Function to get user in database by "id" (without sensitive content)
const getUserById = async (id, exclude) => await getUserBy("id", id, exclude);

// Function to get user in database by "nick" (without sensitive content)
const getUserByNick = async (nick, exclude) =>
  await getUserBy("nick", nick, exclude);

// Function to get user in database by "email" (without sensitive content)
const getUserByEmail = async (email, exclude) =>
  await getUserBy("email", email, exclude);

///////////////////////////////
// VERIFY EXISTS IN DATABASE //
///////////////////////////////

// Generic function to verify if exists user in database by any field (without sensitive content)
const verifyExists = async (field, value, CASE) => {
  const user = await getUserBy(field, value);
  if (!CASE) {
    return user ? true : false;
  }

  if (CASE === "exists") {
    if (!user)
      throw new Error(`${statusCode.NOT_FOUND_CODE} | ${field} not Found!`);
  }
  if (CASE === "nonexistent") {
    if (user)
      throw new Error(
        `${statusCode.BAD_REQUEST_CODE} | ${field} already exists!`
      );
  }
};

// Function to verify if exists user in database by "id" (without sensitive content)
const verifyExistsId = async (id, CASE) => await verifyExists("id", id, CASE);

// Function to verify if exists user in database by "nick" (without sensitive content)
const verifyExistsNick = async (nick, CASE) =>
  await verifyExists("nick", nick, CASE);

// Function to verify if exists user in database by "nick" (without sensitive content)
const verifyExistsEmail = async (email, CASE) =>
  await verifyExists("email", email, CASE);

///////////////////////////////
////////// CONVERT ////////////
///////////////////////////////

// Function to convert user "nick" in "id"
const getUserIdByNick = async (nick) => {
  const user = await User.findOne({
    where: { nick },
    attributes: ["id"],
  });
  return user.dataValues.id;
};

///////////////////////////////
////////// SERVICES ///////////
///////////////////////////////

const login = async ({ nick, password }) => {
  // STEP 1: Verify if nick received exists in database
  await verifyExistsNick(nick, "exists");

  // STEP 2: Found in database an user with same nick and password
  const cryptoPass = md5(password);
  const foundUser = await User.findOne({
    attributes: ["id", "name", "nick", "password"],
    where: { nick, password: cryptoPass },
  });
  if (!foundUser)
    throw new Error(`${statusCode.UNAUTHORIZED_CODE} | Wrong password!`);

  // STEP 3: Generate token
  const token = generateToken(foundUser.dataValues);
  return token;
};

const register = async ({ name, nick, email, password }) => {
  // STEP 1: Verify if nick received already exists in database
  await verifyExistsNick(nick, "nonexistent");

  // STEP 2: Verify if email received already exists in database
  await verifyExistsEmail(email, "nonexistent");

  // STEP 3: Save new user in database
  const cryptoPass = md5(password);
  await User.create({
    name,
    nick,
    email,
    password: cryptoPass,
    avatarUrl: `https://ui-avatars.com/api/?name=${name}&size=512&color=727272`,
    coverUrl:
      "https://htmlcolorcodes.com/assets/images/colors/light-gray-color-solid-background-1920x1080.png",
  });
};

const updateUserData = async (userId, dataToUpdate) => {
  const user = await User.update(
    { ...dataToUpdate },
    { where: { id: userId } }
  );

  return user;
};

module.exports = {
  getUserById,
  getUserIdByNick,
  verifyExistsId,
  getUserByNick,
  verifyExistsNick,
  getUserByEmail,
  verifyExistsEmail,
  login,
  register,
  updateUserData,
};
