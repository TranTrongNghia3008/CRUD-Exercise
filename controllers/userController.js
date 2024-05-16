const controller = {};
const models = require("../models");

controller.show = async (req, res) => {
  res.locals.users = await models.User.findAll({
    attributes: [
      "id",
      "imagePath",
      "username",
      "firstName",
      "lastName",
      "mobile",
      "isAdmin",
    ],
    order: [["createdAt", "DESC"]],
  });
  res.render("user-management");
};

controller.addUser = async (req, res) => {
  let { username, firstName, lastName, mobile, isAdmin} = req.body; // lay trong form submit
  try {
    await models.User.create({
      username,
      firstName,
      lastName,
      mobile,
      isAdmin: isAdmin ? true : false,
    });
    res.redirect("/users"); // reload lai trang user
  } catch (error) {
    res.send("Can not add user!");
    console.error(error);
  }
}

controller.editUser = async (req, res) => {
  let { id, firstName, lastName, mobile, isAdmin} = req.body; // lay trong form submit
  try {
    await models.User.update({
      firstName,
      lastName,
      mobile,
      isAdmin: isAdmin ? true : false,
    },
    {
      where: { id }
    });
    res.send("User updated!");
  } catch (error) {
    res.status(401).send("Can not update user!");
    console.error(error);
  }
}

controller.deleteUser = async (req, res) => {
  try {
    await models.User.destroy({ where: { id: parseInt(req.params.id) } });
    res.send("User deleted!");
  } catch (error) {
    res.status(401).send("Can not delete user!");
    console.error(error);
  }
}

module.exports = controller;
