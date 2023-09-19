const { check, validationResult, body } = require("express-validator");

const login_validator = [
  check("userId", "UserId is required").not().isEmpty(),
  check("password", "Password must contain atleast ten characters")
    .not()
    .isEmpty()
    .isLength({
      min: 10,
    }),
];

const login_validation_results = (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      const error = result.errors[0].msg;
      return res.status(400).json({ error }); // stop the process
    }
    next(); // continue
  };

module.exports = {
  login_validator,
  login_validation_results
};
