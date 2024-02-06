const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser')
require('dotenv').config();
const { dbConnection } = require("./config/dbConnector");
const router = require("./routes/routes");

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(cookieParser());

// add routes
app.use("/api/v1", router)

dbConnection();

app.listen(PORT, () => {
    console.log("Server is listening on port: ", PORT);
});

app.get("/", (req, res) => {
    res.send("Default Route For Auth");
});

