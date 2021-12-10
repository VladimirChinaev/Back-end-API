const path = require("path");
const task = require("../../models/task");
const tasks = require(path.resolve("db.json"));

const get = async (req, res) => {
    const filterByDoneUndone = req.query.filterBy || false;
    const filterDyAscDesc = req.query.order || "desc";
    console.log(req.query.page);
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;
    const offset = page * limit - limit;
    let filteredTasks = tasks.todos;
    if (filterByDoneUndone) {
        filteredTasks = filteredTasks.filter((el) => el.done === filterByDoneUndone);
    }
    if (filterDyAscDesc === "desc") {
        filteredTasks = filteredTasks.sort((a, b) => a.updatedAtt < b.updatedAtt);
    }
    const numberOfTasks = filteredTasks.length;
    filteredTasks = filteredTasks.slice(offset, offset + limit);
    res.send({
        page,
        limit,
        count: numberOfTasks,
        info: filteredTasks,
    });
};
module.exports = get;
