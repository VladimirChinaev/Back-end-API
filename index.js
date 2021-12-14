const express = require("express");
const app = express();
const cors = require('cors');


const PORT = process.env.PORT || 3505;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("api/auth", require("./routes/auth.routes"));

const recursive = require('recursive-readdir-sync');

recursive(`${__dirname}/routes`)
    .forEach(file => app.use('/api', require(file)));


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
