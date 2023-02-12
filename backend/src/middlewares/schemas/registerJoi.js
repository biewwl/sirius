const Joi = require("joi");

const apiConfig = require("../../api_config.json")
const errorMessages = apiConfig['error.messages'];

const schema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "string.min": errorMessages['name.small'],
    "string.max": errorMessages['name.big'],
    "string.required": errorMessages['name.required'],
  }),
  nick: Joi.string().min(3).max(20).required().messages({
    "string.min": errorMessages['nick.small'],
    "string.max": errorMessages['nick.big'],
    "string.required": errorMessages['nick.required'],
  }),
  email: Joi.string()
    .min(3)
    .max(30)
    .regex(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
    .required()
    .messages({
      "string.min": errorMessages['email.small'],
      "string.max": errorMessages['email.big'],
      "string.required": errorMessages['email.required'],
      "string.pattern.base": errorMessages['email.format'],
    }),
  password: Joi.string().min(8).max(50).required().messages({
    "string.min": errorMessages['password.small'],
    "string.max": errorMessages['password.big'],
    "string.required": errorMessages['password.required'],
  }),
});

const validateRegister = (registerData) => schema.validate(registerData);

module.exports = validateRegister;
