const { search_member_controller } = require("../controller/searchCaregiverController");

const router = require("express").Router();

router.post("/search:member_id",search_member_controller);