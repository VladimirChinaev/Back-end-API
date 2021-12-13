const express = require("express");
const router = express.Router();
const { Task } = require('../../models');

module.exports = router.post("/todos", async (req, res) => {
    try {
        if (!req.body.name) {
            return res.status(400).json(" Поле name пустое");
        }
        if (["done", "undone"].includes(req.body.done)) {
            return res.status(400).json("Не соотвествует запросу")
        }
        const name = req.body.name;
        const repeatTask = await Task.findOne({ where: { name } });
        if (repeatTask) {
            return res.status(400).json("Такая задача уже есть!");
        }
        const task = {
            name,
            done: "undone",
        };
        await Task.create(task);
        res.send(task);
    } catch (err) {
        console.log(err);
        res.send("ERROR");
    }
});