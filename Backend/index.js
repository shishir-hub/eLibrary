const express = require('express');
const cors = require('cors');

const app = express();
require('dotenv').config();
require('./config/database');

app.use(cors());

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
    next();
});
app.use(express.json());

app.use('/api', require('./route/auth'));

app.use('/api', require('./route/book'));

app.use('/api', require('./route/user'));


app.get('/api/test', (req, res, next) => {
    res.send("Test succesfull");
})

app.use((req, res) => {
    res.status(404).send({ msg: "Resource not found" });
})

app.use((err, req, res, next) => {
    console.log(err.name);
    let status = 500;
    let msg = "Server Error";
    let errors = [];

    if (err.name == "ValidationError") {
        status = 400;
        msg = "Bad Request";
        Object.entries(err.errors).forEach(error => {
            errors.push({
                msg: error[1].message,
                param: error[0]
            })
        })
    } else if (err.name === 'MongooseError') {
        status = 400;
        msg = "Bad Request";
    }
    res.status(status).send({
        msg,
        errors,
        err,
    });
})

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server started at port : `, port);
})