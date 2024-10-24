require('dotenv').config({ path: './process.env' });
const mongoose = require('mongoose');
const mongoPath = process.env.PROCESS_URL_MONGO;
mongoose.set('strictQuery', true);

module.exports = async () => {
    if (!mongoPath) {
        console.error('MongoDB connection string is missing in the environment variables');
        return;
    }

    try {
        await mongoose.connect(mongoPath);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
    
    return mongoose;
};