const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { db } = require("./configs/database");

const app = express();

const publicDirectory = path.join(__dirname, "./public");
app.use(express.static(publicDirectory));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.set("view engine", "hbs");
db.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Mysql Connected....");
  }
});
app.use("/", require("./routes/groups"));
app.use("/", require("./routes/auth"));
app.use("/", require("./routes/bills"));

app.listen(3005, () => {
  console.log("Server Started on port 3005");
});
