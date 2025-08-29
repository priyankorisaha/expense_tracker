const mongoose = require('mongoose');

const db = async () => {
    try {
        mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database Connected Successfully');
    } catch (error) {
        console.error('Database Connection Failed:', error.message);
        process.exit(1); // stop the app if DB not connected
    }
};

module.exports = { db };
