const { validationResult } = require("express-validator");


// validations middleware
const common_validation_results = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    console.log(result.errors)
    const error = result && result.errors;
    const errRes = [];
    error.forEach(res => {
      errRes.push({
        field: res.path,
        message: res.msg
      })
    });
    return res.status(400).json({ errors: errRes }); // stop the process
  }
  next(); // continue
};


module.exports = { common_validation_results }