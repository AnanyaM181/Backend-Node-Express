const express = require('express')
const bodyParser = require('body-parser')

const app = express();

app.use(express.json())
app.use(bodyParser.json())


let todos = []

app.get('/todos', (req, res) => {
    res.json(todos);
});
// If someone goes to '/todos' the backend shows the user every todos item present in the todos database(todos = [])

app.get('/todos/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id))
    if (!todo) {
        res.status(404).send()
    } else {
        res.json(todo)
    }
});
// req.params.id is send by the user then :id gets checked to the .find()

app.post('/todos', (req , res) => {
    const newTodo ={
        id : Math.floor(Math.random() * 100000000),
        title: req.body.title,
        description: req.body.description
    }
    todos.push(newTodo);
    res.status(201).json(newTodo);
});
/* todos.push(newTodo);
Adds the newly created todo object to the todos array (which must be declared somewhere above as let todos = [];).
Now the new todo is stored in memory.
*/

app.put('/todo/:id' , (req , res) => {
    const todoIndex = todos.findIndex(t=> t.id === parseInt(req.params.id));
    if (todoIndex === -1) {
        res.status(404).send();
    } else {
        todos[todoIndex].title =req.body.title;
        todos[todoIndex].description = req.body.description;
        res.json(todos[todoIndex]);
    }
});
// todoIndex is the index number present in todos array

app.delete('/todod/:id' , (req, res) => {
    const todoIndex = todos.findIndex(t => t.id === parseInt(req.params.id));
    if (todoIndex === -1) {
        res.status(404).send();
    } else {
        todos.splice(todoIndex , 1);
        res.status(200).send();
    }
});
/* splice is a method that changes an array by removing or adding elements.
Syntax: array.splice(startIndex, deleteCount)
Here:
todoIndex = the position of the todo we found.
1 = remove one element starting at that position.
So this line removes exactly that todo from the array
*/

// for all other routes, return 404
app.use((req, res, next) => {
    res.status(404).send();
});

function start() {
    console.log(`Example app listening port 3000`);
}

app.listen(3000, start) 