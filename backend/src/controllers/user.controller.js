const userService = require("../services/user.service");

const UserController = async (req, res, next) => {
  try {
    const { nick, password } = req.body;
    const response = await userService.login(nick, password);
    res.status(200).json(response);
  } catch (error) {
    next(error)
  }
};

module.exports = UserController;
