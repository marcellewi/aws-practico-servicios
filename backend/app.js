require("dotenv").config();
const express = require("express");
const { sequelize } = require("./config/database");
const userController = require("./controllers/userController");
const cors = require("cors");

const app = express();
app.use(cors());

app.use(express.json());

app.use("/api/users", userController);

const PORT = process.env.PORT || 8000;

sequelize
  .sync()
  .then(() => {
    app.listen(PORT || 8000, () => {
      console.log("Server is running on port " + PORT);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
