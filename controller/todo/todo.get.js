const path = require("path");
const tasks = require(path.resolve("db.json"));

const get = async (req, res) => {
    const filterByDoneUndone = req.query.filterBy || false;
    const filterDyAscDesc = req.query.order || "desc";
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;
    const offset = page * limit - limit;
    let filteredTasks;
    if (!filterByDoneUndone) {
        filteredTasks = tasks.todos;
    } else {
        console.log(filterByDoneUndone);
        filteredTasks = tasks.todos.filter(
            (el) => el.done === filterByDoneUndone
        );
    }
    if (filterDyAscDesc === "desc") {
        filteredTasks = filteredTasks.sort((a, b) => {
            if (a.updatedAtt < b.updatedAtt) {
                return 1;
            } else {
                return -1;
            }
        });
    } else {
        filteredTasks = filteredTasks.sort((a, b) => {
            if (a.updatedAtt > b.updatedAtt) {
                return 1;
            } else {
                return -1;
            }
        });
    }

    filteredTasks = filteredTasks.slice(offset, offset + limit);

    return res.send({
        info: filteredTasks,
    });
};
module.exports = get;
