const express = require("express");
const router = express.Router();
const auth = require("../../midlleware/auth.middleware");
const { Task } = require('../../models');

module.exports = router.post("/todos", auth,
    async (req, res) => {
        try {
            if (!req.body.name) {
                return res.status(400).json(" Поле name пустое");
            }
            if (!["done", "undone"].includes(req.body.done)) {
                return res.status(400).json("Не соотвествует запросу")
            }
            const name = req.body.name;
            const { userId } = res.locals

            const isExists = await Task
                .findOne({
                    where: { name, userId }
                })

            if (isExists) {
                return res.status(400).json("Такая задача уже есть!");
            }
            const task = {
                name,
                done: "undone",
                userId,
            };
            await Task.create(task);
            res.send(task);
        } catch (err) {
            console.log(err);
            res.send("ERROR");
        }
    });