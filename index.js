const express = require("express");
const app = express();
const cors = require('cors');
const dotenv = require("dotenv");
dotenv.config();
console.log(process.env.PORT);

const PORT = process.env.PORT || 3505;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const recursive = require('recursive-readdir-sync');
const { sequelize } = require("./models");

recursive(`${__dirname}/routes`)
    .forEach(file => app.use('/api', require(file)));


app.listen(PORT, () => {
    sequelize.sync()
    console.log(`Server is listening on port ${PORT}`);
});
