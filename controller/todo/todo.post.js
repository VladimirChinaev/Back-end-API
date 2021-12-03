const path = require('path');
const fs = require('fs');
const tasks = require(path.resolve("db.json"));
const { v4 } = require("uuid");
const createTask = (req, res) => {
    const name = req.body.name;
    if (!name) { return res.status(400).json(error(" Поле name пустое")) };
    if (name.length < 2) return res.status(400).json(error("Поле записи меньше 2 символов"));
    const repeatTask = tasks.todos.findIndex((el) => el.name === name);
    if (repeatTask !== -1) return res.status(400).json(error("Такая задача уже есть!"));
    try {
        const task = { uuid: v4(), name: req.body.name, done: false, updatedAtt: new Date() }
        const upTasks = [...tasks, task];
        fs.writeFile("db.json", JSON.stringify(upTasks), (err) => {
            if (err) {
                console.log(err);
            }
        });
    } catch (err) {
        console.log(err);
    }
}
module.exports = createTask;