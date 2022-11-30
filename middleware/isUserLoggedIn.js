const express = require("express");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config({ path: "./.env" });

const isUserLoggedIn = (req, res, next) => {
  const token = req.cookies["jwt"];
  if (!token) return res.redirect("/login");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    return res.redirect("/login");
  }
};

module.exports = isUserLoggedIn;
