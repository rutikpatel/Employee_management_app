const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const empRouter = require("./routes/EmpRoutes");
const userRouter = require('./routes/userRoutes');

const DB_URL = "mongodb://localhost:27017/EmployeeManagerDB"
const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
mongoose.Promise = global.Promise;

// TODO - Update your mongoDB Atals Url here to Connect to the database
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database mongoDB Server");
}).catch(err => {
    console.log('Could not connect to the database.', err);
    process.exit();
});

app.get('/', (req, res) => {
    res.send("<h1>Assignment 2 - Rutik Patel</h1>");
});

app.use(empRouter);
app.use('/users', userRouter);
app.listen(9090, () => {
    console.log("Server is listening on port 9090");
});