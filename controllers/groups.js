const { db } = require("../configs/database");

exports.groups = async (req, res) => {
  db.query("SELECT * FROM `groups`", async (error, groups) => {
    if (error) return res.render("error", { error: JSON.stringify(error) });
    const groupRes = JSON.parse(JSON.stringify(groups));
    db.query(
      "SELECT groups.id, groups.name FROM `groups` INNER JOIN `accounts` ON groups.id = accounts.group_id WHERE accounts.user_id = ?",
      req.user.id,
      async (errormyGroups, myGroups) => {
        if (errormyGroups)
          return res.render("error", { error: JSON.stringify(errormyGroups) });
        const myGroupsRes = JSON.parse(JSON.stringify(myGroups));
        return res.render("groups", {
          groups: groupRes,
          myGroups: myGroupsRes,
        });
      }
    );
  });
};

exports.addGroup = async (req, res) => {
  db.query(
    "INSERT INTO accounts SET ? ",
    { user_id: req.user.id, group_id: req.body.groupId },
    async (error, _) => {
      if (error) return res.render("error", { error: JSON.stringify(error) });
      return res.redirect("/");
    }
  );
};
