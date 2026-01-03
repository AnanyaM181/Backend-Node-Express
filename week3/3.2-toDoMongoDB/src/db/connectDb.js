const mongoose = require('mongoose');
// This line imports Mongoose into our file
/* Mongoose is a library used to connect Node.js applications to MongoDB and makes working with MongoDB easier.*/

const connectDb = async () => {
    /* creating an asynchronous function called connectDb.
       async is used because connecting to MongoDB takes some time, and we want to handle it properly using await
    */
    try {
        // Code inside try will run, and if any error happens, it will go to the catch block.
        await mongoose.connect('mongodb+srv://ananyamohapatra822_db_user:Ananya%40183011@cluster0.kos3lm6.mongodb.net/test', {
            // { ... } is an options object
            useNewUrlParser: true, // tells Mongoose to use the new MongoDB URL parser
            useUnifiedTopology: true, // enables MongoDB driver’s new connection logic for better stability
        });
        console.log('✅ Connected to MongoDB');
        //If the connection is successful, this line prints a message in the console to confirm that the MongoDB connection is working
    } catch (error) {
        // If anything goes wrong inside the try block (like wrong password, no internet, wrong cluster), the error will be caught here
        console.error('❌ MongoDB connection failed:', error.message);
        //prints an error message
    }
};


module.exports = connectDb;
/*This exports the connectDb function.
It allows to use this function in other files like index.js by importing it. */
