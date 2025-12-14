const mongoose = require('mongoose'); //Imports the Mongoose library
// Mongoose is used to connect Node.js with MongoDB

const connectDb = async () => {
    try {
        await mongoose.connect('mongodb+srv://ananyamohapatra822_db_user:Ananya%40183011@cluster0.kos3lm6.mongodb.net/test', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('connect to mongoDb');

    } catch (error) {
        console.error('mongoDb connection failed', error.message);

    }

}
module.exports = connectDb;