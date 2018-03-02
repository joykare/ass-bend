const express = require("express");
const app = express();
const crypto = require("crypto");
const request = require("axios");
const mongoose = require("mongoose");
const env = process.env.NODE_ENV;
var DB_URI;

require('dotenv').config();

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
})


const ts = Date.now();
const data = ts + `${process.env.API_PRIVATE_KEY}` + `${process.env.API_KEY}`
console.log("data------>", data);


const hash = crypto.createHash('md5').update(data).digest("hex");

request.get(`http://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${process.env.API_KEY}&hash=${hash}`).then(function (response) {
    console.log(response.data.data.results);
  }
) .catch(function (error) {
  console.log(error);
});

app.get("/", (req, res) => res.send("Hey"));
app.listen(3000, () => console.log("Here here here"));
