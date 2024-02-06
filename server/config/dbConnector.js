const mongoose = require('mongoose');
require('dotenv').config();

exports.dbConnection = () => {
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("DataBase Connection Successfully");
    }).catch((err) => {
        console.log("DataBAse Connection Failed");
        console.log(err);
        process.exit(1);
    })
}