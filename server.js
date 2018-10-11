var express = require("express");
var bodyParser = require("body-parser");
const fs = require("fs");
let todos = [];
let lastIndex;
const TODOS_FILE = "./serverdata/todos.json";

function setAccessControlHeaders(response) {
  response.set({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods":
      "OPTIONS, HEAD, GET, POST, PUT, PATCH, DELETE"
  });
}

fs.readFile(TODOS_FILE, function(err, file) {
  if (err) {
    return console.error(err);
  }
  todos = JSON.parse(file);
  lastIndex = Math.max(...todos.map(({ id }) => id), 0);
});

var app = express();
app.use(bodyParser.json());

app.get("/", function(req, res) {
  res.send("hello world");
});

app.get("/todos", function(req, res) {
  setAccessControlHeaders(res);
  res.json(todos);
});

app.options("*", function(req, res) {
  setAccessControlHeaders(res);

  res.end();
});

app.post("/todo", function(req, res) {
  setAccessControlHeaders(res);

  todos.push({ ...req.body, id: ++lastIndex });

  fs.writeFile(TODOS_FILE, JSON.stringify(todos, null, 2), function(err) {
    if (err) {
      res.set({ "Status Code": 500 });

      return res.end(err);
    }

    res.end();
  });
});

app.delete("/todo/:id", function(req, res) {
  setAccessControlHeaders(res);

  const id = parseInt(req.params.id);
  todos = todos.filter(todo => todo.id !== id);

  fs.writeFile(TODOS_FILE, JSON.stringify(todos, null, 2), function(err) {
    if (err) {
      res.set({ "Status Code": 500 });

      return res.end(err);
    }

    res.end();
  });
});

app.patch("/todo", function(req, res) {
  setAccessControlHeaders(res);

  const id = parseInt(req.body.id);
  todos.forEach(todo => {
    if (todo.id === id) {
      todo.completed = true;
    }
  });

  fs.writeFile(TODOS_FILE, JSON.stringify(todos, null, 2), function(err) {
    if (err) {
      res.set({ "Status Code": 500 });

      return res.end(err);
    }

    res.end();
  });
});

app.listen(1333);
