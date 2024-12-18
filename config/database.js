const mongoose = require('mongoose')




const connectDatabase = () => {
    mongoose.connect(process.env.DB_LOCAL_URI)
        .then(() => {
            console.log('MongoDB connected successfully');
        })
        .catch(error => {
            console.error('MongoDB connection failed:', error.message);
        });
};


module.exports = connectDatabase;