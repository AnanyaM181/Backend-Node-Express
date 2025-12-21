const mongoose = require('mongoose'); //Imports the Mongoose library
// Mongoose is used to connect Node.js with MongoDB

const connectDb = async () => { // async allows us to use await inside the function
    try { // If any error occurs in try, execution jumps to catch
        await mongoose.connect('mongodb+srv://ananyamohapatra822_db_user:CKGcSjbcp9tjdnhD@cluster0.q73043m.mongodb.net/'//, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        //}
        );
        console.log('connect to mongoDb'); // Runs only if the connection is successful

    } catch (error) { // Runs only if something goes wrong in the try block
        console.error('mongoDb connection failed', error.message);

    }

}
module.exports = connectDb;
// Exports the connectDb function
// Allows other files (like index.js) to import and use it