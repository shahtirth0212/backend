// Importing packages
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const foodItemsRoute = require('./routes/foodItems');
const ordersRoute = require('./routes/orderRoutes');
require("dotenv/config");

const app = express();

app.use(cors());
app.use(bodyParser.json());


app.use('/getFoodItems',foodItemsRoute);
app.use('/orders',ordersRoute);
app.use(express.static(__dirname + '/login'));
app.use(express.static(__dirname + '/customerApp'));
app.use(express.static(__dirname + '/managerApp'));
app.use(express.static(__dirname + '/chefApp'));
// ManagerApp route
app.get('/managerApp', (req, res) => {
    res.sendFile(path.join(__dirname,"/login/login_page.html"));
});
app.get('/managerLoginSuccess', (req, res) => {
    res.sendFile(path.join(__dirname,"/managerApp/index.html"));
});
app.get('/viewAll', (req, res) => {
    res.sendFile(path.join(__dirname,"/managerApp/index.html"));
});
app.get('/history', (req, res) => {
    res.sendFile(path.join(__dirname,"/managerApp/index.html"));
});
app.get('/customerApp!:table', (req, res) => {
    res.sendFile(path.join(__dirname,"/customerApp/index.html"));
});
app.get('/chefApp', (req, res) => {
    res.sendFile(path.join(__dirname,"/chefApp/index.html"));
});
app.get("/",(req, res) => {
    res.send("Hello")
})

// Database connection
mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
    console.log("Connection to database sucessfull");
});

// Start listening
app.listen(80);