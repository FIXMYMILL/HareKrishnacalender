const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql=require("mysql");
require('dotenv').config();
const mysql2 = require("mysql2/promise");

const port=process.env.PORT||3000;

const cors = require('cors');
app.use(cors());

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));


// Serve HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

var connection =mysql.createConnection({
    host:process.env.HOSTNAME,
    user:process.env.USERNAME,
    password:process.env.PASSWORD,
    database:process.env.DATABASE,
    port:process.env.DATABASEPORT,
})

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

app.post('/', (req, res) => {
    let data = req.body;
    console.log(data);
    connection.query("INSERT INTO RDBMS set ?", data, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
    res.redirect("/");
});

app.post('/events',express.json(),(request, res) => {
    const {date}=request.body;
    console.log(date);
    res.json({
        status: 'success',
        message: 'Data received successfully!'
    });
    connection.query("SELECT * FROM RDBMS WHERE Date=?",date, function (err, result, fields) {
        if (err) throw err;
        // res.send(JSON.stringify(result));
        res.send(result);
      });
});

app.listen(port,"0.0.0.0",() => {
    console.log(`Server is running on port ${port}`);
});




