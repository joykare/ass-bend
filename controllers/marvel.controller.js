const request = require("axios");
const crypto = require("crypto");
const mongoose = require("mongoose");
require('dotenv').config();

const ts = Date.now();
const data = ts + `${process.env.API_PRIVATE_KEY}` + `${process.env.API_KEY}`
console.log("data------>", data);


const hash = crypto.createHash('md5').update(data).digest("hex");

module.exports = {
  find: (req, res) => {
    request.get(`http://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${process.env.API_KEY}&hash=${hash}`).then((response) => {
        console.log(response.data.data.results);

        characterData = response.data.data.results;
        res.status(200).send(characterData);
      }
    ) .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
  }
}