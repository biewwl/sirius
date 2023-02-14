const Joi = require("joi");

const apiConfig = require("../../api_config.json");
const errorMessages = apiConfig["error.messages"];

const schema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "string.min": errorMessages["name.small"],
    "string.max": errorMessages["name.big"],
    "any.required": errorMessages["name.required"],
    "string.empty": errorMessages["name.required"],
  }),
  nick: Joi.string()
    .min(3)
    .max(20)
    .regex(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/)
    .required()
    .messages({
      "string.min": errorMessages["nick.small"],
      "string.max": errorMessages["nick.big"],
      "any.required": errorMessages["nick.required"],
      "string.empty": errorMessages["nick.required"],
      "string.pattern.base": errorMessages["nick.format"],
    }),
  email: Joi.string()
    .min(6)
    .max(30)
    .regex(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
    .required()
    .messages({
      "string.min": errorMessages["email.small"],
      "string.max": errorMessages["email.big"],
      "any.required": errorMessages["email.required"],
      "string.empty": errorMessages["email.required"],
      "string.pattern.base": errorMessages["email.format"],
    }),
  password: Joi.string()
    .min(8)
    .max(50)
    .regex(/.*[^ ].*/)
    .required()
    .messages({
      "string.min": errorMessages["password.small"],
      "string.max": errorMessages["password.big"],
      "any.required": errorMessages["password.required"],
      "string.empty": errorMessages["password.required"],
      "string.pattern.base": errorMessages["password.format"],
    }),
});

const validateFormRegister = (registerData) => schema.validate(registerData);

module.exports = validateFormRegister;
