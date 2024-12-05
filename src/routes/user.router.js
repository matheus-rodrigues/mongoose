const express = require("express");
const router = express.Router();
const userModel = require("../models/user.model.js");

router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const { first_name, last_name, email, password } = req.body;

    const userCreated = await userModel.create({
      first_name,
      last_name,
      email,
      password,
    });
    return res.render("userCreated", { first_name: userCreated.first_name });
  } catch (e) {
    res.render("error", { error: e.message });
  }
});

router.put("/:id", async (req, res) => {
  console.log("Arquivo recebido:", req.file); // Verifica o arquivo recebido
  console.log("Dados do formulário:", req.body); // Verifica os dados enviados no formulário
  try {
    const { id } = req.params;
    const { first_name, last_name, email, password } = req.body;
    //const avatar = req.file ? `/images/${req.file.filename}` : '/images/default-avatar.png'; // Caminho do avatar

    const userUpdated = await userModel.updateOne(
      { _id: id },
      { first_name, last_name, email, password }
    );

    return res.status(200).json(userUpdated);
  } catch (error) {
    return res.render("error", { error: error.message });
  }
});

module.exports = router;
