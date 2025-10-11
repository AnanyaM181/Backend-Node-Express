const express = require('express')
const bodyParser = require('body-parser')
const connectDb = require('./src/db/connectDb')
const ToDo = require('./src/models/toDo')

const app = express();

app.use(express.json()) // Built-in Express middleware to automatically parse JSON request bodies.
app.use(bodyParser.json()) //parses JSON request bodies

connectDb();

//to create a todo
app.post('/todos', async (req, res) => {
    try {
        const todo = new ToDo(req.body);
        const saved = await todo.save();
        res.status(200).json(todo);
    } catch (err) {
        res.status(400).json({ error: err.message });

    }
})


app.get('/todos', async (req, res) => {
    try {
        const todos = await ToDo.find()
        res.status(200).json({
            allTodos: todos,
            message: "Successfully retrieved all todos"
        })
    } catch (err) {
        res.status(400).json({
            error: "Error while retriving all todos"
        })
    }
})
// for all other routes, return 404
app.use((req, res, next) => {
    res.status(404).send();
});

function start() {
    console.log(`Example app listening port 3000`);
}

app.listen(3000, start) 