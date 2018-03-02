const express = require("express");
const app = express();
const mongoose = require("mongoose");
const env = process.env.NODE_ENV;
const cors = require("cors");
const routes = require("./routes/routes.js")
var DB_URI;

require('dotenv').config();
app.use(cors());

// some future time when I actually have a testing thingy
if (env === "testing") {
  // TODO: change this
  DB_URI= "mongodb://<dbuser>:<dbpassword>@ds153778.mlab.com:53778/marvel-dev"
}
DB_URI = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds153778.mlab.com:53778/marvel-dev`;

mongoose.connect(DB_URI, (error) => {
  if (error) {
    console.log("error", error);
  } else {
    console.log("successful db connect");
  }
});

app.get("/", (req, res) => res.send("Hey"));
routes(app);
app.listen(3001, () => console.log("Here here here"));

module.exports = app;