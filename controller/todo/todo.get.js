const path = require("path");
const tasks = require(path.resolve("db.json"));

const get = async (req, res) => {
    const filterByDoneUndone = req.query.filterBy || false;
    const filterDyAscDesc = req.query.order || "desc";
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;
    const pageNumbers = [];
    const offset = page * limit - limit;
    let filteredTasks;
    if (filterByDoneUndone) {
        filteredTasks = tasks.todos.filter((el) => el.done === filterByDoneUndone);
    }
    if (filterDyAscDesc === "desc") {
        filteredTasks = filteredTasks.sort((a, b) => a.updatedAtt < b.updatedAtt);
    }
    filteredTasks = filteredTasks.slice(offset, offset + limit);
    res.send({
        page,
        limit,
        info: filteredTasks, page, limit
    });
};
module.exports = get;
