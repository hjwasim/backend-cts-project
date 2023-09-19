const { search_member_controller } = require("../controller/searchCaregiverController");

const router = require("express").Router();

router.get("/search/simple/:member_id", search_member_controller);
router.post("/search/advance", search_member_controller);

module.exports = router;