const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const connectDB = async () => {
    try {
        let uri = process.env.MONGO_URI;

        // Give them a hassle-free database if they haven't set up their own
        if (!uri || uri.includes('testuser:testpassword')) {
            const mongoServer = await MongoMemoryServer.create();
            uri = mongoServer.getUri();
            console.log("Using In-Memory MongoDB Server for 0-setup testing.");
        }

        const conn = await mongoose.connect(uri);

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
