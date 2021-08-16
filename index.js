const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
//DB config
const db = mysql.createPool({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'Admin@12345',
    database: 'test',
});
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}))
app.get("/", (req, res) => {
    res.send("server home");
})
app.get("/api/get", (req, res) => {
    const sqlSelect = "SELECT * FROM users";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
})

app.post("/api/insert", (req, res) => {
    const userName = req.body.userName
    const sqlInsert = "Insert into users (name) Values (?)";
    db.query(sqlInsert, [userName], (err, result) => {
        console.log(err);
    });
})

app.delete("/api/delete/:id", (req, res) => {
    const userId = req.params.id
    const sqlDelete = "delete from users where id = ?";
    db.query(sqlDelete, userId, (err, result) => {
        if(err) console.log(err);
    });
})

app.put("/api/update", (req, res) => {
    const userId = req.body.userId
    const setNewName = req.body.newName
    const sqlUpdate = "update users set name = ? where id = ?";
    db.query(sqlUpdate, [setNewName, userId], (err, result) => {
        if(err){
            console.log(err);
        } 
        else{
            console.log(result);
        }
    });
})
app.listen(3001, () => {
    console.log("Running on port 3001");
})