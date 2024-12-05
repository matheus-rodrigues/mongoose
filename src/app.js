const express = require("express");
const mongoose = require("mongoose");
const handlebars = require("express-handlebars");
const userRouter = require("./routes/user.router.js");
const viewRouter = require("./routes/views.router.js");

const path = require("path");

const app = express();

const pathView = path.join(`${__dirname}/views`);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", pathView);

app.use("/user", userRouter);
app.use("/", viewRouter);

mongoose
  .connect(
    "mongodb+srv://rmatheus454:coder.c3vkat@clustercoder.tptry.mongodb.net/usersdb"
  )
  .then(() => {
    console.log("MongoDB conectado.");
  })
  .catch((e) => {
    console.error("Erro ao conectar-se ao MongoDB", e.message);
  });

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
