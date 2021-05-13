const express = require('express');
const users = require('./Routes/users');
const projects = require('./Routes/projects');

const app = express();
const port = 4000;
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
var cors = require('cors')


app.use(cors())

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/ethfund', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
mongoose.connection.on('error', console.error.bind(console, 'MongoDB Connection error'));

app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.json({"project":"Rest API for EthFund"})
})

app.use('/users', users);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.use('/project', projects)

// app.use('/classes', validateUser, classes);  //for authentication

/*function validateUser(req, res, next) {
    try {
        const token = req.header('Authorization').replace('Bearer','')
        const data = jwt.verify(token, process.env.JWT_KEY)
        if(!data) {
            throw new Error()
        }
        next()
    } catch(error) {
        res.status(401).send({error: 'Not authorized to access this resource'})
    }
}*/

app.listen(port, () => {
    console.log("server listening on port "+ port);
})