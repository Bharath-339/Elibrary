const mongoose = require('mongoose');


// Set multer storage engine to the newly created object

const dbUrl = process.env.DB_URL || 'mongodb://127.0.0.1:27017/Elibrary';


mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

