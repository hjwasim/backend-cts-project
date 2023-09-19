const { assign_member_controller } = require("../controller/assignCaregiverController");

const router = require("express").Router();

router.post("/assign:member_id",assign_member_controller);
