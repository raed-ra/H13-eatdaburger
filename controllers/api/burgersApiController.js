
var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burger = require("../../models/burger.js");

router.post("/api/burgers", async function(req, res) {
    let result = await burger.create([
      "name", "devoured"
    ], [
      req.body.name, req.body.devoured
    ]) 
      // Send back the ID of the new quote
      res.json({ id: result.insertId });
  });
  
  router.put("/api/burgers/:id", async function(req, res) {
    var condition = "id = " + req.params.id;
  
    console.log("condition", condition);
    console.log(req.body.devoured)
    let result = await burger.update({
      devoured: req.body.devoured
    }, condition) 
      if (result.changedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
  });
  
  router.delete("/api/burgers/:id", async function(req, res) {
    var condition = "id = " + req.params.id;
  
    let result = await burger.delete(condition) 
      if (result.affectedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
  });
  
  // Export routes for server.js to use.
  module.exports = router;