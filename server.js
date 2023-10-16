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
var connection =mysql.createConnection({
    host:process.env.HOSTNAME,
    user:process.env.USERNAM,
    password:process.env.PASSWORD,
    database:process.env.DATABASE,
    port:process.env.DATABASEPORT,
})


// const getConnection = () => {
//     return new Promise((resolve, reject) => {
//       pool.getConnection((err, connection) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(connection);
//         }
//       });
//     });
//   };

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

app.post('/', (req, res) => {
    connection.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
    });
    let data = req.body;
    console.log(data);
    connection.query("INSERT INTO RDBMS set ?", data, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
    res.redirect("/");
    connection.end();
});


// async function executeQuery() {
//     try {
//       const connection = await getConnection();
//       const [results, fields] = await connection.query('SELECT * FROM your_table');
//       connection.release(); // Release the connection back to the pool
//       console.log(results);
//     } catch (error) {
//       console.error('Error executing query:', error);
//     }
//   }

app.post('/events',express.json(),(request, res) => {
    connection.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
    });
    const {date}=request.body;
    console.log(date);
    connection.query("SELECT * FROM RDBMS WHERE Date=?",date, function (err, result, fields) {
        if (err) throw err;;
        res.send(result);
      });
    connection.end();
});

app.listen(port,"0.0.0.0",() => {
    console.log(`Server is running on port ${port}`);
});




