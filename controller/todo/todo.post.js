const path = require("path");
const fs = require("fs");
let tasks = require(path.resolve("db.json"));
const { v4 } = require("uuid");
const createTask = async (req, res) => {
    try {
        const name = req.body.name;
        if (!name) {
            res.status(400).json(" Поле name пустое");
        }
        const repeatTask = tasks.todos.findIndex((el) => el.name === name);
        if (repeatTask !== -1) {
            res.status(400).json("Такая задача уже есть!");
        }
        const task = {
            uuid: v4(),
            name: req.body.name,
            done: "undone",
            updatedAtt: new Date(),
        };
        tasks.todos = [...tasks.todos, task];
        fs.writeFileSync("db.json", JSON.stringify(tasks));
        res.send(task);
    } catch (err) {
        console.log(err);
        res.send("ERORR");
    }
};
module.exports = createTask;
