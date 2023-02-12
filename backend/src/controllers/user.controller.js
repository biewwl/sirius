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

const register = async (req, res, next) => {
  try {
    const { name, nick, email, password } = req.body;
    const formData = { name, nick, email, password };

    const { error } = validateRegister(formData);
    if (error) throw new Error(error.message);

    const response = await userService.register(formData);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { login, register };
