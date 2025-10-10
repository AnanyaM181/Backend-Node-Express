const mongoose = require('mongoose'); //imports Mongoose

const toDoSchema = new mongoose.Schema({ // creating a schema for your To-Do items
    // A schema defines the structure of documents inside the MongoDB collection (like a blueprint)
    title: {
        type : String, // title must be text
        required : true // This field is mandatory. Every To-Do must have a title
        // Note: Correct spelling is required, not require
    },

    description: {
        type : String
    }, // It's optional because required is not set.

    completed : {
        type : Boolean, // it stores only true or false
        default : false // if we don’t provide this value when saving, it will automatically be false.
    }

});

const ToDo = mongoose.model("ToDo",toDoSchema);
// creating a model named "ToDo" using the schema toDoSchema
// A model is used to interact with the database — e.g., create, read, update, delete documents.
//"ToDo" is the model name — MongoDB will automatically create a collection called todos

module.exports = ToDo;
// This exports the model so other files can use it