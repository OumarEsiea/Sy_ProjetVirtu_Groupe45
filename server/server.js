const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');

//Inspiré du LAB6

const db = mysql.createPool({
    host: "database",
    user: "test",
    password: "test",
    database: "crudgames",
});

app.use(express.json());
app.use(cors());

app.post("/register", (req, res) => {
    const { Victoire } = req.body;
    const { Defaite } = req.body;
    const { BonnePaire } = req.body;
    const { FaussePaire } = req.body

  console.log(req.body)

  let sql = "INSERT INTO games (Victoire, Defaite, BonnePaire, FaussePaire) VALUES (?,?,?,?)" //Adaptation des valeurs avec ma base de donnes
  db.query(sql, [Victoire, Defaite, BonnePaire, FaussePaire], (err,result) =>{
    if (err) {
        console.log(err);
    }else{
        console.log(result);
    }
  })
});

app.get("/games", (req, res) => {

    let sql = "SELECT * FROM games";
    db.query(sql, (err,result) =>{
        if (err) {
            console.log(err);
        }else{
            res.send(result);
        }

    })
});

app.delete("/delete/:index", (req,res) =>{
    const { index } = req.params

    let sql = "DELETE FROM games WHERE id = ?"
    db.query(sql, [index], (err,result) =>{err ? console.log(err) : res.send(result)})
})

app.listen(3000, () =>
    console.log("Running in the port 3000")
);