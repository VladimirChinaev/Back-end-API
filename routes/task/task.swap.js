const { Router } = require('express')
const router = Router()
const { Task } = require("../../models/task")
const auth = require("../../midlleware/auth.middleware")

module.exports = router.patch('/todos-swap', auth, async (req, res, next) => {
    try {
        const fromId = req.body.fromId || false;
        const whereId = req.body.whereId || false;

        let queryFrom = await Task.findByPk(fromId);
        let queryWhere = await Task.findByPk(whereId);

        const intermediate = queryFrom.sorting;

        queryFrom.sorting = queryWhere.sorting;
        queryWhere.sorting = intermediate;
        await queryFrom.save();
        await queryWhere.save();

        return res.status(200);
    } catch (err) {
        next(err);
    }
})