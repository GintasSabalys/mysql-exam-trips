const { db } = require("../configs/database");

exports.bills = async (req, res) => {
  db.query(
    `SELECT * FROM accounts WHERE user_id = ${req.user.id} AND group_id = ${req.params.groupId}`,
    async (error, myGroups) => {
      if (error) return res.render("error", { error: JSON.stringify(error) });
      if (myGroups.length === 0) {
        return res
          .status(403)
          .render("Error", {
            error: "Forbidden to access groups which are not assigned",
          });
      }
      db.query(
        "SELECT bills.amount, bills.description, groups.name FROM `bills` INNER JOIN `groups` ON bills.group_id = groups.id WHERE groups.id = ?",
        +req.params.groupId,
        async (error, result) => {
          if (error)
            return res.render("error", { error: JSON.stringify(error) });
          return res.render("bills", {
            bills: JSON.parse(JSON.stringify(result)),
            groupId: +req.params.groupId,
          });
        }
      );
    }
  );
};

exports.addBill = async (req, res) => {
  db.query(
    "INSERT INTO bills SET ? ",
    {
      group_id: req.body.groupId,
      amount: req.body.amount,
      description: req.body.description,
    },
    async (error, _) => {
      if (error) return res.render("error", { error: JSON.stringify(error) });
      return res.redirect(`/bills/${req.body.groupId}`);
    }
  );
};
