const express = require("express");
const billsController = require("../controllers/bills");
const isUserLoggedIn = require("../middleware/isUserLoggedIn")
const router = express.Router();

router.get("/bills/:groupId", isUserLoggedIn , billsController.bills);
router.post("/bills", isUserLoggedIn, billsController.addBill);

module.exports = router;
