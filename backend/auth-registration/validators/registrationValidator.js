const { check, validationResult, body } = require("express-validator");

const registration_validator = [
  check("email", "Please enter a valid email").notEmpty().isEmail(),
  check("fname", "").isString().notEmpty().not().isAlphanumeric(),
  check("lname", "").isString().notEmpty().not().isAlphanumeric(),
  check("password", "Password must contain atleast 10 characters")
    .isLength({
      min: 10,
    })
    .matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*d)[a-zA-Zd]{10,}$"),
];

// validations middleware
const validationResults = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const error = result.errors[0].msg;
    return res.status(400).json({ error }); // stop the process
  }
  next(); // continue
};

// Check if email is taken
const check_email = async (username) => {
  let user = ""; //TODO
  return user ? true : false;
};

module.exports = {
  registration_validator,
  validationResults,
};
