const path = require('path');
const tasks = require(path.resolve("db.json"));
const getTasks = (req, res) => {
    return res.json(tasks);
}
module.exports = getTasks;