const { Router } = require("express");
const v2api = require("./v2api");

const api = Router();

api.use("/v2", v2api);

api.all("*", (req, res) => {
  res.sendStatus(404);
});

module.exports = api;
