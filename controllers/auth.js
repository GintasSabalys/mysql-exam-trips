const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { db } = require("../configs/database");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Email", email);
    console.log("Password", password);
    if (!email || !password) {
      return res.status(400).render("login", {
        message: "Please provide an email and password",
      });
    }
    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (error, results) => {
        console.log(results);

        if (
          results.length === 0 ||
          !(await bcrypt.compare(password, results[0].password))
        ) {
          res.status(401).render("error", {
            message: "email or password is incorrect",
          });
        } else {
          const id = results[0].id;
          const token = jwt.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
          });
          console.log("The token is : " + token);
          const cookieOptions = {
            expires: new Date(
              Date.now() + process.env.JWT_COOKIE_EXPIRES * 60 * 60 * 1000
            ),
            httpOnly: true,
          };
          res.cookie("jwt", token, cookieOptions);
          res.redirect("/");
        }
      }
    );
  } catch (error) {
    console.log("ERROR:", error);
  }
};

exports.logut = async (req, res) => {
  res.clearCookie("jwt");
  return res.redirect("/login");
};

exports.register = (req, res) => {
  console.log(req.body);
  const { name, email, password, passwordConfirm } = req.body;
  db.query(
    "SELECT email FROM users WHERE email = ?",
    [email],
    async (error, results) => {
      console.log(results);
      if (error) {
        console.log(error);
      }
      if (results.length > 0) {
        return res.render("register", {
          message: "Wrong input",
        });
      } else if (password !== passwordConfirm) {
        return res.render("register", {
          message: "Password do not match",
        });
      }
      let hashedPassword = await bcrypt.hash(password, 8);
      console.log(hashedPassword);
      db.query(
        "INSERT INTO users SET ? ",
        { name: name, email: email, password: hashedPassword },
        (error, results) => {
          if (error) {
            console.log(error);
          } else {
            console.log(results);
            return res.render("register", {
              message: "user registred",
            });
          }
        }
      );
    }
  );
};
