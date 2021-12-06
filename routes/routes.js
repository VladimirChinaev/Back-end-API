const { response } = require("express");
const express = require("express");
const path = require('path');
const router = express.Router();
const getTasks = require('./../controller/todo/todo.get');
const createTask = require('./../controller/todo/todo.post');
const deleteTask = require("./../controller/todo/todo.delete");

router.get("/todos", getTasks);
router.post("/todos", createTask);
router.delete("/todos/:uuid", deleteTask);
module.exports = router;