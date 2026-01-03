const express = require('express')
const bodyParser = require('body-parser')
const connectDb = require('./src/db/connectDb')
const ToDo = require('./src/models/toDo') // Imports the ToDo model (Mongoose schema)

const app = express();

app.use(express.json()) // Built-in Express middleware to automatically parse JSON request bodies.
app.use(bodyParser.json()) //parses JSON request bodies

connectDb();
// Calls a function that connects your server to your MongoDB database.


// TO CREATE TODO


// POST new todo
app.post('/todo', async (req, res) => {
  try {
    const todo = new ToDo(req.body);
    const saved = await todo.save();
    res.status(200).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });

  }
})
// req.body contains todo data sent by user.
// new ToDo(req.body) creates a new todo object.
// todo.save() inserts it into MongoDB.
// Sends back the saved todo as JSON.
// Handles errors properly.


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
// Fetches all todos from MongoDB using ToDo.find().
// Responds with all todo items.
// Sends error if database fails.


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
// req.params.id gets the id from the URL.
// findByIdAndUpdate() updates a todo by ID.
// { new: true } ensures it returns the updated document.
// If no todo found → send 404.
// Sends updated todo back.


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
// Deletes a todo by ID.
// If item not found → return 404.
// If found → delete it from DB.



// for all other routes, return 404
app.use((req, res, next) => {
  res.status(404).send();
});
// Runs when no route matches.
//Sends 404 Not Found response.

function start() {
  console.log(`Example app listening port 3000`); // prints a message when server is running.
}

app.listen(3000, start)
// Starts the server on port 3000.
// Calls start() after starting.