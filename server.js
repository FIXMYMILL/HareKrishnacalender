const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const mysql=require("mysql");
const mysql2 = require("mysql2/promise");

const cors = require('cors');
app.use(cors());

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));


// Serve HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

var connection =mysql.createConnection({
    host: "sql12.freesqldatabase.com",
    user: "sql12651258",
    password: "L9y8ePVTBI",
    database: "sql12651258",
    port: 3306,
})

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

app.post('/', (req, res) => {
    let data = req.body;
    connection.query("INSERT INTO RDBMS set ?", data, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
    res.redirect("/");
});

app.post('/events',express.json(),(request, res) => {
    const {date}=request.body;
    console.log(date);
    // res.json({
    //     status: 'success',
    //     message: 'Data received successfully!'
    // });
    connection.query("SELECT * FROM RDBMS WHERE Date=?",date, function (err, result, fields) {
        if (err) throw err;
        // res.send(JSON.stringify(result));
        res.send(result);
      });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});




