const express = require("express");
const router = express.Router();
const { Task } = require('../../models');


module.exports = router.delete("/todos/:uuid", async (req, res) => {
    try {
        const id = req.params.uuid;
        const isCorrectElem = await Task.findByPk(id);
        if (isCorrectElem) {
            isCorrectElem.destroy();
        }
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        res.status(404).send(err);
    }
});