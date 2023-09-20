const { checkSchema } = require("express-validator");
const { registration_controller, login_controller } = require("../controller/authController");
const { common_validation_results } = require("../validators/validationResult");
const { registration_schema, login_schema } = require("../validators/validationSchema");
const verifyJwt = require("../validators/jwtVerify");

const router = require("express").Router();

// routes
router.get("/verify", verifyJwt, (req, res) => res.json({ message: "success" }))
router.post("/registration", checkSchema(registration_schema), common_validation_results, registration_controller);
router.post("/login", checkSchema(login_schema), common_validation_results, login_controller);

module.exports = router;