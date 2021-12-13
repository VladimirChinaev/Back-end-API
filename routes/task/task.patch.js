const express = require("express");
const router = express.Router();
const { Task } = require('../../models');


module.exports = router.patch("/todos/:uuid", async (req, res) => {
    try {
        const taskId = req.params.uuid;
        const itemIndex = await Task.findByPk(taskId);
        if (itemIndex) {
            itemIndex.name = req.body.name;
            itemIndex.done = req.body.done;
            itemIndex.save();
        }
        res.status(200).send(itemIndex);
    } catch (err) {
        res.status(404).send({ message: "Task not found" });
    }
});