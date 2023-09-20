const { checkSchema } = require("express-validator");
const { simple_search_member_controller, advance_search_member_controller } = require("../controller/searchCaregiverController");
const verifyJwt = require("../validators/jwtVerify");
const { advance_search_schema } = require("../validators/validationSchema");

const router = require("express").Router();

router.get("/simple/:member_id", verifyJwt, simple_search_member_controller);
router.post("/advance", verifyJwt, checkSchema(advance_search_schema), advance_search_member_controller);

module.exports = router;