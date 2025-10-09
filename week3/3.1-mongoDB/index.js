const express = require('express')
const bodyParser = require('body-parser')
const connectDb = require('./src/db/connectDb')

const app = express();

app.use(express.json())
app.use(bodyParser.json())

connectDb();


// for all other routes, return 404
app.use((req, res, next) => {
    res.status(404).send();
});

function start() {
    console.log(`Example app listening port 3000`);
}

app.listen(3000, start) 