const express = require('express')
const bodyParser = require('body-parser')
const connectDb = require('./src/db/connectDb')
const ToDo = require('./src/models/toDo')

const app = express();

app.use(express.json()) // Built-in Express middleware to automatically parse JSON request bodies.
app.use(bodyParser.json()) //parses JSON request bodies

connectDb();

//to create a todo

// POST new todo
app.post('/todos', async (req, res) => {
    try {
        const todo = new ToDo(req.body);
        const saved = await todo.save();
        res.status(200).json(todo);
    } catch (err) {
        res.status(400).json({ error: err.message });

    }
})

// GET one todo
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

// PUT update todo
app.put('/todos/:id', async (req, res) => {
  try {
    const updated = await ToDo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).send('Todo not found');
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE todo
app.delete('/todos/:id', async (req, res) => {
  try {
    const deleted = await ToDo.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).send('Todo not found');
    res.status(200).send('Todo deleted');
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// for all other routes, return 404
app.use((req, res, next) => {
    res.status(404).send();
});

function start() {
    console.log(`Example app listening port 3000`);
}

app.listen(3000, start) 