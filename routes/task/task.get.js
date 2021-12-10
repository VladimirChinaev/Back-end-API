const express = require("express");
const router = express.Router();
const { Task } = require('../../models');


module.exports = router.get("/todos", async (req, res) => {
    try {
        const done = req.query.filterBy || false;
        const order = req.query.order || "desc";
        const page = req.query.page || 1;
        const limit = req.query.limit || 5;
        const offset = page * limit - limit;
        if (done && !["done", "undone"].includes(done)) {
            return (res
                .status(400)
                .json(err("not valid task", done))
            )
        }

        const { where } = done ? { where: { done } } : {}
        const query = await Task.findAndCountAll(
            {
                limit,
                offset,
                where,
                order: [["createdAt", order]]
            })
        return res.json({
            page,
            limit,
            data: query
        });
    } catch (err) {
        console.log(err);
    }
});