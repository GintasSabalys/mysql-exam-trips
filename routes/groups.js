const express = require("express");
const groupsController = require("../controllers/groups");
const isUserLoggedIn = require("../middleware/isUserLoggedIn");
const router = express.Router();

router.get("/", isUserLoggedIn, groupsController.groups);
router.post("/", isUserLoggedIn, groupsController.addGroup);

module.exports = router;
