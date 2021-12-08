const express = require("express");
const app = express();
const router = require('./routes/routes');
const cors = require('cors');


const PORT = process.env.PORT || 3502;


app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use('/api', router);


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
