const userService = require("../services/user.service");
const validateRegister = require("../middlewares/schemas/registerJoi");

const login = async (req, res, next) => {
  try {
    const { nick, password } = req.body;
    const response = await userService.login({ nick, password });
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

const register = async (req, _res, next) => {
  try {
    const { name, nick, email, password } = req.body;
    const formData = { name, nick, email, password };

    const { error } = validateRegister(formData);
    if (error) throw new Error(error.message);

    await userService.register(formData);
    next();
  } catch (error) {
    next(error);
  }
};

const accountData = async (req, res, next) => {
  try {
    const { userId } = req;
    const { fields } = req.body;

    const userData = await userService.getUserById(userId, fields);

    res.status(200).json(userData);
  } catch (error) {
    next(error);
  }
};

module.exports = { login, register, accountData };
