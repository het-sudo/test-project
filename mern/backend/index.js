const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


const app = express();


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
    origin: "*",
 
  })
);

const routes = require("./routes/routes");
app.use(routes);