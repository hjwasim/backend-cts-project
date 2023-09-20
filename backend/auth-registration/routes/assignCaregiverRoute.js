const { assign_member_controller } = require("../controller/assignCaregiverController");
const verifyJwt = require("../validators/jwtVerify");

const router = require("express").Router();

router.get("/:member_id", verifyJwt, assign_member_controller);

module.exports = router;