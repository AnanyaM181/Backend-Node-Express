const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(express.json())
app.use(bodyParser.json())

const userDetails = (req, res) => {
    // const name = req.body.name
    // const age = req.body.age
    // const gender = req.body.gender
    const { name, age, gender } = req.body   //short of the above content
    res.json(`${name} is ${age} years old and gender is ${gender}`)
}

app.post('/userDetails', userDetails)

// function handleFirstRequest(req , res) {
//     res.send('Hello World')
// }
// app.get('/', handleFirstRequest)

function started() {
    console.log(`Example app listening on port ${port}`)
}

app.listen(port, started)