const path = require("path");
const fs = require("fs");
let tasks = require(path.resolve("db.json"));

const patchTask = (req, res) => {
    console.log(req.params.uuid)
    try {
        console.log(req.params);
        console.log(tasks.todos.length);
        const taskId = req.params.uuid;
        const itemIndex = tasks.todos.find((el) => el.uuid === taskId);
        if (tasks.todos.length) {
            itemIndex.name = req.body.name;
            itemIndex.done = req.body.done;
        }
        fs.writeFileSync("db.json", JSON.stringify(tasks));
        res.status(200).send(itemIndex);
    } catch (err) {
        res.status(404).send({ message: 'Task not found' });
    }
}


module.exports = patchTask;