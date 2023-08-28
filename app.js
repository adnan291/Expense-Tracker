const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const Expense = require("./models/expenses");
const User = require("./models/users");

const app = express();
const expenseRoutes = require("./routes/expense");
const userRoutes = require("./routes/user");

app.use(bodyParser.json({ extended: false }));
app.use(cors());

app.use("/expense", expenseRoutes);
app.use("/user", userRoutes);

app.use("/", (req, res) => {
  res.sendFile(path.join(__dirname, `views/${req.url}`));
});

mongoose
  .connect(process.env.MONGODB_URL)
  .then((result) => {
    app.listen(4000, () => {
      console.log("connected!!!!");
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.use((req, res, next) => {
  res.status(404).send("<h1>Page Not Found</h1>");
});
