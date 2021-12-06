const path = require('path');
const fs = require('fs');
let tasks = require(path.resolve("db.json"));
const { v4 } = require("uuid");

const patchTask = (req, res) => {
    if (!req.body) return res.sendStatus(400);
    const taskId = req.params.uuid;
    const taskName = req.body.name;
    const taskStatus = req.body.done;
    let task;
    for (let i = 0; i < tasks.todos.length; i++) {
        if (tasks.todos[i].uuid == taskId) {
            task = tasks.todos[i];
            break;
        }
    }
    if (task) {
        task.name = taskName;
        task.done = taskStatus;
        fs.writeFileSync("db.json", JSON.stringify(tasks));
        res.send(task);
    }
    else {
        res.done(404).send(task);
    }
}


module.exports = patchTask;