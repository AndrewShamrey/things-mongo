const { Router } = require("express");

const {
  createThing,
  getThings,
  getThing,
  updateThing,
  deleteThing
} = require('../services');

const { generateThing } = require('../utils/generateThing');

const api = Router();

api.get("/things", (req, res) => {
  getThings(req.query)
    .then(things => {
      res.json(things);
    })
    .catch((err) => {
      console.log(err);
      res.status(500);
      res.end("Access failed");
    });
});

api.get("/things/:id", (req, res) => {
  const id = req.params.id;
  getThing(id)
    .then(thing => res.json(thing))
    .catch(err => {
      res.status(404);
      res.end("Not found!");
    });
});

api.post("/things", (req, res) => {
  const newThing = generateThing(req);
  if (newThing.message) {
    res.status(400);
    res.end(newThing.message);
    return;
  }
  createThing(newThing)
    .then(() => {
      res.status(201);
      res.end("New thing was added!");
    })
    .catch((err) => {
      res.status(500);
      res.end("Access failed");
    });
});

api.put("/things/:id", (req, res) => {
  const id = req.params.id;
  const newThing = generateThing(req);
  if (newThing.message) {
    res.status(400);
    res.end(newThing.message);
    return;
  }
  updateThing(id, newThing)
    .then(() => {
      res.status(200);
      res.end("Resource updated successfully!");
    })
    .catch((err) => {
      res.status(500);
      res.end("Access failed");
    });
});

api.delete("/things/:id", (req, res) => {
  const id = req.params.id;
  deleteThing(id)
    .then(() => {
      res.status(200);
      res.end("Resource deleted successfully!");
    })
    .catch((err) => {
      res.status(500);
      res.end("Access failed");
    });     
});

module.exports = api;
