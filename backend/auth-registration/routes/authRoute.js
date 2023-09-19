const { registration_controller, login_controller } = require("../controller/authController");
const { login_validator, login_validation_results } = require("../validators/loginValidator");
const { registration_validator, registration_validation_results } = require("../validators/registrationValidator");

const router = require("express").Router();

router.post(
  "/registration",
  registration_validator,
  registration_validation_results,
  registration_controller
);

router.post("/login", login_validator, login_validation_results, login_controller);
