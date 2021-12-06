const path = require("path");
const fs = require("fs");
let tasks = require(path.resolve("db.json"));

const deleteTask = (req, res) => {
    const id = req.params.uuid;
    let index = -1;
    for (let i = 0; i < tasks.todos.length; i++) {
        if (tasks.todos[i].uuid == id) {
            index = i;
            break;
        }
    }
    if (index > -1) {
        const task = tasks.todos.splice(index, 1)[0];
        fs.writeFileSync("db.json", JSON.stringify(tasks));
        console.log("found");
        res.send(task);
    } else {
        res.status(404).send();
        console.log("not found");
    }
};
module.exports = deleteTask;
