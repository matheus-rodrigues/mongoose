const express = require("express");
const router = express.Router();
const userModel = require("../models/user.model.js");

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/list", async (req, res) => {
  try {
    let users = await userModel.find();
    users = users.map((user) => user.toJSON());
    return res.render("users", { users });
  } catch (e) {
    return res.render("error", { error: e.message });
  }
});

router.get("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let user = await userModel.findById(id);
    user = user.toJSON();
    return res.render("update", { user });
  } catch (error) {
    return res.render("error", { error: error.message });
  }
});

module.exports = router;
