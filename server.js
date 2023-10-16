const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// const mysql=require("mysql");
require('dotenv').config();
const mysql = require("mysql2");

const port=process.env.PORT||3000;

const cors = require('cors');
app.use(cors());

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));


// Serve HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

console.log(process.env.USERNAM);
// var connection =mysql.createConnection({
//     host:process.env.HOSTNAME,
//     user:process.env.USERNAM,
//     password:process.env.PASSWORD,
//     database:process.env.DATABASE,
//     port:process.env.DATABASEPORT,
// })


const pool = mysql.createPool({
    host:process.env.HOSTNAME,
    user:process.env.USERNAM,
    password:process.env.PASSWORD,
    database:process.env.DATABASE,
    port:process.env.DATABASEPORT,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
  });

  pool.getConnection()
  .then(async (connection) => {
    if (connection.state === 'connected') {
      console.log('Connection is open');
    } else {
      console.log('Connection is closed');
    }

    // Release the connection back to the pool
    connection.release();
  })
  .catch((err) => {
    console.error('Error getting connection from the pool:', err);
  });

// connection.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
// });

app.post('/', (req, res) => {
    // connection.connect(function(err) {
    //     if (err) throw err;
    //     console.log("Connected!");
    // });
    let data = req.body;
    console.log(data);
    // connection.query("INSERT INTO RDBMS set ?", data, function (err, result) {
    //     if (err) throw err;
    //     console.log("1 record inserted");
    // });

    pool.query("INSERT INTO RDBMS set ?", data, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
    res.redirect("/");
});




app.post('/events',express.json(),(request, res) => {
    connection.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
    });
    const {date}=request.body;
    console.log(date);
    // connection.query("SELECT * FROM RDBMS WHERE Date=?",date, function (err, result, fields) {
    //     if (err) throw err;;
    //     res.send(result);
    //   });
      
    pool.query("SELECT * FROM RDBMS WHERE Date=?",date, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
    });
});

app.listen(port,"0.0.0.0",() => {
    console.log(`Server is running on port ${port}`);
});




