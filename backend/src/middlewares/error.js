const errorMiddleware = (error, _req, res, _next) => {
  const { message } = error;
  const [code, textMessage] = message.split(" | ");

  console.log(error);

  return res
    .status(Number(code) || 500)
    .json({ error: textMessage || error.message });
};

module.exports = errorMiddleware;
