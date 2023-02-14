const jwt = require("jsonwebtoken");

const secret = process.env.API_SECRET; // Secret to JWT

const generateToken = (payload) => jwt.sign(payload, secret); // Generate token

module.exports = generateToken;
