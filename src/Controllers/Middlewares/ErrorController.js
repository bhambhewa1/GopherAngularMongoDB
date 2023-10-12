const handleDuplicateKeyError = (err, res) => {
  const field = Object.values(err.keyValue);
  const error = [`Email already exists.`];
  let code = 409;
  // res.status(code).send({ messages: error, fields: field });
  return { status: 409, messages: error, fields: field };
};

const handleValidationError = (err, res) => {
  let errors = Object.values(err.errors).map((el) => el.message);
  let fields = Object.values(err.errors).map((el) => el.path);
  let code = 400;
  return { status: 400, messages: errors, fields: fields };
};

module.exports = (err, req, res, next) => {
  try {
    console.log("congrats you hit the error middleware");
    if (err.name === "ValidationError")
      return (err = handleValidationError(err, res));
    if (err.code === 11000)
      return (err = handleDuplicateKeyError(err, res));
  } catch (err) {
    return {
      status: 500,
      Error: err,
      messages: ["An unknown error occurred."],
    };
  }
};
