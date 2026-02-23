const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());


require("dotenv").config();


mongoose
  .connect(process.env.dbURL)
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log("Connection to the Database was established!");
    });
  })
  .catch((error) => console.log(error));

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.use(
  cors({
origin: "http://localhost:3000",
credentials: true
 
  })
);

const routes = require("./routes/routes");
const authRoutes = require("./routes/auth");

app.use(routes);

app.use(authRoutes); 