const { registration_controller } = require("../controller/authController");
const {
  validationResults,
  registration_validator,
} = require("../validators/registrationValidator");

const router = require("express").Router();

router.post(
  "/registration",
  registration_validator,
  validationResults,
  registration_controller
);
