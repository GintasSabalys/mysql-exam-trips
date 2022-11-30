const express = require("express");
const authController = require("../controllers/auth");
const router = express.Router();

router.get("/login", (req, res) => {
  res.render("login");
});
router.get("/register", (req, res) => {
  res.render("register");
});
router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);
router.post("/auth/logout", authController.logut);

module.exports = router;
