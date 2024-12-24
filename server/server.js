const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const filePath = path.join(__dirname, '/index.html');
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
    const { IdCarte1 } = req.body
    const { IdCarte2 } = req.body
    const { IdCarte3 } = req.body

  console.log(req.body)

  let sql = "INSERT INTO games (Victoire, Defaite, BonnePaire, FaussePaire, IdCarte1, IdCarte2, IdCarte3) VALUES (?,?,?,?,?,?,?)" //Adaptation des valeurs avec ma base de donnes
  db.query(sql, [Victoire, Defaite, BonnePaire, FaussePaire, IdCarte1, IdCarte2, IdCarte3], (err,result) =>{
    if (err) {
        console.log(err);
    }else{
        console.log(result);
    }
  })
});

app.post('/addDatabase',(req,res)=>{
    const { idpokemon } = req.body
    const { Nom } = req.body
    const { ImGSrc } = req.body

    let sql = "INSERT INTO cards (idpokemon, Nom, ImGSrc) VALUES (?,?,?)" //Adaptation des valeurs avec ma base de donnes
    db.query(sql, [idpokemon, Nom, ImGSrc], (err,result) =>{
      if (err) {
          console.log(err);
      }else{
          console.log(result);
      }
    })

    console.log("Creation de la base")
})

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

app.get("/pokemonList",(req,res)=>{
    res.sendFile(filePath)
})

app.delete("/delete/:index", (req,res) =>{
    const { index } = req.params

    let sql = "DELETE FROM games WHERE id = ?"
    db.query(sql, [index], (err,result) =>{err ? console.log(err) : res.send(result)})
})


app.listen(3000, () =>
    console.log("Running in the port 3000")
);