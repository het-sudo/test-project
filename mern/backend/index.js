require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();


app.use(cors({
  origin: "http://localhost:3000",
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routes = require("./routes/routes");
const authRoutes = require("./routes/auth");

app.use(routes);
app.use(authRoutes);

mongoose
  .connect(process.env.dbURL || "mongodb://localhost:27017/MERN_PROJECT")
  .then(() => {
    app.listen(process.env.PORT || 4000, () => {
      console.log("Connection to the Database was established!");
      console.log(`Server running on port ${process.env.PORT || 4000}`);
    });
  })
  .catch((error) => console.log(error));