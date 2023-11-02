const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// const mysql=require("mysql2");
require('dotenv').config();
const mysql = require("mysql2/promise");

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
// var connection=mysql.createConnection({
//     host:process.env.HOSTNAME,
//     user:process.env.USERNAM,
//     password:process.env.PASSWORD,
//     database:process.env.DATABASE,
//     port:process.env.DATABASEPORT,
// })

// connection.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
// });

const connection = mysql.createPool({
  host:process.env.HOSTNAME,
  user:process.env.USERNAM,
  password:process.env.PASSWORD,
  database:process.env.DATABASE,
  port:process.env.DATABASEPORT,
  // waitForConnections: true,
  // connectionLimit: 10,
  // maxIdle: 10,
  // idleTimeout: 60000,
  // queueLimit: 0
});



async function insertDetails(data) {
  const sql ="INSERT INTO RDBMS set ?";
  const [rows] = await connection.query(sql,data);
  console.log("inserted");
  return rows;
}

app.post('/', async(req, res) => {
    let data = req.body;
    console.log(data);
    // connection.query("INSERT INTO RDBMS set ?", data, function (err, result) {
    //     if (err) throw err;
    //     console.log("1 record inserted");
    // });
    const result = await insertDetails(data);
    res.redirect("/");
});


async function getDetails(date) {
  console.log(date+"get details");
  const sql ="SELECT * FROM RDBMS WHERE Date=?";
  const [rows] = await connection.query(sql,date);
  console.log(rows);
  return rows;
}


app.post('/events',express.json(),async(request, res) => {
    console.log("request is done");
    const {date}=request.body;
    console.log(date);
    const result = await getDetails(date);
    res.send(result);
    // connection.query("SELECT * FROM RDBMS WHERE Date=?",date, function (err, result, fields) {
    //     if (err) throw err;;
    //     res.send(result);
    // });
});

app.listen(port,"0.0.0.0",() => {
    console.log(`Server is running on port ${port}`);
});




