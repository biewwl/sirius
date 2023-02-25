const error = (code, message) => ({
  error: { code, message },
});

module.exports = error;
