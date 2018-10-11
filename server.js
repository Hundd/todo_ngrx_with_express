var express = require("express");
var app = express();

const fs = require("fs");

app.get("/", function(req, res) {
  res.send("hello world");
});

app.get("/todos", function(req, res) {
  res.set({
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS, HEAD, GET, POST, PUT, PATCH"
  });
  fs.createReadStream("./serverdata/todos.json").pipe(res);
  // res.send("hello world1");
});

app.listen(1333);
