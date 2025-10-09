const mongoose = require('mongoose');

const toDoSchema = new mongoose.Schema({
    title: {
        type : String,
        require : true
    },

    description: {
        type : String
    },

    completed : {
        type : Boolean,
        default : false
    }

});

const ToDo = mongoose.model("ToDo",toDoSchema);

module.exports = ToDo;