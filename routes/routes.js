const marvel = require("../controllers/marvel.controller.js");

module.exports = function (app) {
  app.get("/api/marvel_characters", marvel.find)
}