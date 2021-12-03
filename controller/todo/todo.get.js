const path = require('path')
const tasks = require(path.resolve('db.json'));

const get = async (req, res) => {
    const filterByDoneUndone = req.query.filterBy || false;
    const filterDyAscDesc = req.query.order || 'desc';
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;
    const offset = page * limit - limit;
    let filteredTasks;
    if (!filterByDoneUndone) {
        filteredTasks = tasks.name
    } else {
        filteredTasks = tasks.name.filter(el => el.done === filterByDoneUndone)
    }


    if (filterDyAscDesc === "desc") {
        filteredTasks = filteredTasks.sort(
            (a, b) => {
                if (a.date < b.date) { return 1 }
                else { return -1 }
            })
    } else {
        filteredTasks = filteredTasks.sort(
            (a, b) => {
                if (a.date > b.date) { return 1 }
                else { return -1 }
            })
    }

    return res.json({
        page,
        limit,
        data: filteredTasks.slice(offset, offset + limit)
    })


}
module.exports = get;