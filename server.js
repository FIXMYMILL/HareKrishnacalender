const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
// const mysql=require("mysql2");
require('dotenv').config();
// const mysql = require("mysql2/promise");

const port=process.env.PORT||3000;

const cors = require('cors');
const { ListSearchIndexesCursor } = require('mongodb');
app.use(cors());

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));


const url="mongodb+srv://harekrishna:harekrishna@cluster0.a3tfpck.mongodb.net/?retryWrites=true&w=majority"

async function connect(){
    try{
        await mongoose.connect(url);
        console.log("connected to database");
    }catch(e){
        console.error(e);
    }
} 
connect();


const Schema=mongoose.Schema;
const sessionschema=new Schema({
    Date:String,
    Session:String,
    Donor_Name:String,
    Phone:String,
    Booked_By:String,
    Sevak_Name:String,
    Donor_id:String,
    Occassion:String,
    Reciept_Number:String,
    will_attend:String
})

const MyModel = mongoose.model('harekrishnaentry',sessionschema);

async function search(date){
    try{
     return await MyModel.find({Date:date}).exec();
    }catch(e){
        console.error(e);
    }  
}

app.post('/events',express.json(),(request, res) => {
    const {date}=request.body;
    console.log(date);
    search(date).then(result=>{
        res.send(result);
    },(error)=>{
        console.log(error);
    });
});


app.post('/',(req, res) => {
    let data = req.body;
    console.log(data);
    const newentry=new MyModel(data);
    newentry.save();
    res.redirect("/");
});



// Serve HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});









































































// console.log(process.env.USERNAM);
// var connection=mysql.createConnection({
//     host:process.env.HOSTNAME,
//     user:process.env.USERNAM,
//     password:process.env.PASSWORD,
//     database:process.env.DATABASE,
//     port:process.env.DATABASEPORT,
//     connectionLimit:10,
// })

// connection.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
// });

// // const connection = mysql.createPool({
// //   host:process.env.HOSTNAME,
// //   user:process.env.USERNAM,
// //   password:process.env.PASSWORD,
// //   database:process.env.DATABASE,
// //   port:process.env.DATABASEPORT,
// //   waitForConnections: true,
// //   connectionLimit: 10,
// //   maxIdle: 10,
// //   idleTimeout: 60000,
// //   queueLimit: 0
// // });



// // async function insertDetails(data) {
// //   const sql ="INSERT INTO maniteja_RDBMS set ?";
// //   const [rows] = await connection.query(sql,data);
// //   console.log("inserted");
// //   return rows;
// // }

// // app.post('/', async(req, res) => {
// //     let data = req.body;
// //     console.log(data);
// //     // connection.query("INSERT INTO RDBMS set ?", data, function (err, result) {
// //     //     if (err) throw err;
// //     //     console.log("1 record inserted");
// //     // });
// //     const result = await insertDetails(data);
// //     res.redirect("/");
// // });


// // async function getDetails(date) {
// //   console.log(date+"get details");
// //   const sql ="SELECT * FROM maniteja_RDBMS WHERE Date=?";
// //   const [rows] = await connection.query(sql,date);
// //   console.log(rows);
// //   return rows;
// // }




app.listen(port,"0.0.0.0",() => {
    console.log(`Server is running on port ${port}`);
});




