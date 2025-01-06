
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/e-commerce?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.9')
    .then(() => console.log("Database connected successfully"))
    .catch(err => console.error("Database connection error:", err));
