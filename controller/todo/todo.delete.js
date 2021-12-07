const path = require("path");
const fs = require("fs");
let tasks = require(path.resolve("db.json"));
const deleteTask = (req, res) => {
    try {
        const id = req.params.uuid;
        const isCorrectElem = tasks.todos.find(item => item.uuid === id);
        if (isCorrectElem && tasks.todos.length) {
            const newTaskArray = tasks.todos.filter((item) => item.uuid !== id)
            tasks.todos = newTaskArray;
            fs.writeFileSync("db.json", JSON.stringify(tasks));
            res.status(200).send(isCorrectElem);
        } else {
            res.status(205).send("error")
        }
    } catch (err) {
        console.log(err);
        res.status(404).send(err);
    }
};
module.exports = deleteTask;
