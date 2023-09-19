const { assign_member_controller } = require("../controller/assignCaregiverController");

const router = require("express").Router();

router.post("/",assign_member_controller);

module.exports = router;