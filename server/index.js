const express = require('express');
const server = express();
const mysql = require('mysql2');
const cors = require('cors');

const db = mysql.createPool({
    host: "database",
    user: "test",
    password: "test",
    database: "crudgames",
});

server.use(express.json());
server.use(cors());

server.post("/register", (req, res) => {
    const { Victoire } = req.body;
    const { Defaite } = req.body;
    const { BonnePaire } = req.body;
    const { FaussePaire } = req.body

  console.log(req.body)

  let sql = "INSERT INTO games (Victoire, Defaite, BonnePaire, FaussePaire) VALUES (?,?,?,?)"
  db.query(sql, [Victoire, Defaite, BonnePaire, FaussePaire], (err,result) =>{
    if (err) {
        console.log(err);
    }else{
        console.log(result);
    }
  })
});

server.get("/games", (req, res) => {

    let sql = "SELECT * FROM games";
    db.query(sql, (err,result) =>{
        if (err) {
            console.log(err);
        }else{
            res.send(result);
        }

    })
});

server.delete("/delete/:index", (req,res) =>{
    const { index } = req.params

    let sql = "DELETE FROM games WHERE id = ?" //Modification faite par rapport au code initial en mettant id a la place idgames
    db.query(sql, [index], (err,result) =>{err ? console.log(err) : res.send(result)})
})

server.listen(3001, () =>
    console.log("Running in the port 3001")
);