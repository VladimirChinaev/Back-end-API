const path = require('path');
const fs = require('fs');
let tasks = require(path.resolve("db.json"));
const { v4 } = require("uuid");
const createTask = (req, res) => {
    const name = req.body.name;
    if (!name) { return res.status(400).json(" Поле name пустое") };
    if (name.length < 2) return res.status(400).json("Поле записи меньше 2 х символов");
    const repeatTask = tasks.todos.findIndex((el) => el.name === name);
    if (repeatTask !== -1) return res.status(400).json("Такая задача уже есть!");
    try {
        const task = { uuid: v4(), name: req.body.name, done: "undone", updatedAtt: new Date() };
        tasks.todos = [...tasks.todos, task];
        fs.writeFile("db.json", JSON.stringify(tasks), (err) => {
            if (err) {
                console.log(err);
            }
        });
    } catch (err) {
        console.log(err);
    }
    return res.json([]);
}
module.exports = createTask;