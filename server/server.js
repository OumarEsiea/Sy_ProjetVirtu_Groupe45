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
    const { DefaitePartielle } = req.body;
    const { BonnePaire } = req.body;
    const { FaussePaire } = req.body
    const { IdCarte1 } = req.body
    const { IdCarte2 } = req.body
    const { IdCarte3 } = req.body
    const { IdCarte4 } = req.body
    const { IdCarte5 } = req.body
    const { IdCarte6 } = req.body

  let sql = "INSERT INTO games (Victoire, Defaite, DefaitePartielle, BonnePaire, FaussePaire) VALUES (?,?,?,?,?)" //Adaptation des valeurs avec ma base de donnes
  db.query(sql, [Victoire, Defaite, DefaitePartielle, BonnePaire, FaussePaire], (err,result) =>{
    if (err) {
        console.log(err);
    }else{

        let idGame = result.insertId
        
        if(Defaite == true){
            
            let sql = "INSERT INTO defaite (idGame, IdCarte1, IdCarte2, IdCarte3, IdCarte4, IdCarte5, IdCarte6) VALUES (?,?,?,?,?,?,?)"
            db.query(sql, [idGame, IdCarte1, IdCarte2, IdCarte3, IdCarte4, IdCarte5, IdCarte6], (err,result) =>{
                if (err) {
                    console.log(err);
                }else{
                    console.log(result);
                }
              })
        }
        else if(Victoire == true){
            let sql = "INSERT INTO victoire (idGame, IdCarte1, IdCarte2, IdCarte3) VALUES (?,?,?,?)"
            db.query(sql, [idGame, IdCarte1, IdCarte2, IdCarte3], (err,result) =>{
                if (err) {
                    console.log(err);
                }else{
                    console.log(result);
                }
              })
        }
        else if( DefaitePartielle == true){

                let sql = "INSERT INTO defaitePartielle (idGame, IdCarte1, IdCarte2, IdCarte3) VALUES (?,?,?,?)"
                db.query(sql, [idGame, IdCarte1, IdCarte2, IdCarte3], (err,result) =>{
                    if (err) {
                        console.log(err);
                    }else{
                        console.log(result);
                    }
                  })   
        }
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

app.get("/pokemonList/:id",(req,res)=>{

    const idGame = req.params.id
  
let sql = `
    SELECT 
        v.idGame, 
        c1.ImGSrc AS ImGSrcCarte1, 
        c2.ImGSrc AS ImGSrcCarte2, 
        c3.ImGSrc AS ImGSrcCarte3
    FROM victoire v
    JOIN cards c1 ON v.IdCarte1 = c1.id
    JOIN cards c2 ON v.IdCarte2 = c2.id
    JOIN cards c3 ON v.IdCarte3 = c3.id
    WHERE v.idGame = ?
`;

db.query(sql, [idGame], (err, result) => {
    if (err) {
        console.error("Erreur lors de l'exécution de la requête :", err);
        res.status(500).send("Erreur serveur");
    } else {
        res.send(result);
    }
    });
})

app.get("/Defaite/:id",(req,res)=>{
    const { id } = req.params

    let sql = `
    SELECT 
        d.idGame, 
        c1.ImGSrc AS ImGSrcCarte1, 
        c4.ImGSrc AS ImGSrcCarte4, 
        c2.ImGSrc AS ImGSrcCarte2,
        c5.ImGSrc AS ImGSrcCarte5, 
        c3.ImGSrc AS ImGSrcCarte3,
        c6.ImGSrc AS ImGSrcCarte6
    FROM defaite d
    JOIN cards c1 ON d.IdCarte1 = c1.id
    JOIN cards c2 ON d.IdCarte2 = c2.id
    JOIN cards c3 ON d.IdCarte3 = c3.id
    JOIN cards c4 ON d.IdCarte4 = c4.id
    JOIN cards c5 ON d.IdCarte5 = c5.id
    JOIN cards c6 ON d.IdCarte6 = c6.id
    WHERE d.idGame = ?
    `;

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Erreur lors de l'exécution de la requête :", err);
            res.status(500).send("Erreur serveur");
        } else {
            res.send(result);
        }
        });
})

app.get("/DefaitePart/:id",(req,res)=>{
    
    const idGame = req.params.id
    
let sql = `
    SELECT 
        df.idGame, 
        c1.ImGSrc AS ImGSrcCarte1, 
        c2.ImGSrc AS ImGSrcCarte2, 
        c3.ImGSrc AS ImGSrcCarte3
    FROM defaitePartielle df
    JOIN cards c1 ON df.IdCarte1 = c1.id
    JOIN cards c2 ON df.IdCarte2 = c2.id
    JOIN cards c3 ON df.IdCarte3 = c3.id
    WHERE df.idGame = ?
`;

db.query(sql, [idGame], (err, result) => {
    if (err) {
        console.error("Erreur lors de l'exécution de la requête :", err);
        res.status(500).send("Erreur serveur");
    } else {
        res.send(result);
    }
    });
})


app.delete("/delete/:index", async (req, res) => {
    const { index } = req.params; // 'index' correspond à l'id du jeu à supprimer

    try {
        // Supprimer dans la table 'games'
        const sql = "DELETE FROM games WHERE id = ?";
        db.query(sql, [index], (err, result) => {
            if (err) {
                console.error("Erreur lors de la suppression dans 'games':", err);
                return res.status(500).send({ message: "Erreur lors de la suppression dans 'games'", error: err });
            }

            // Vérifier si une suppression a eu lieu
            if (result.affectedRows === 0) {
                return res.status(404).send({ message: "Aucun jeu trouvé avec cet id" });
            }

            // Grâce aux contraintes ON DELETE CASCADE, les lignes liées dans 'victoire', 'defaite' et 'defaitePartielle' seront automatiquement supprimées.
            res.status(200).send({ message: "Le jeu et ses données associées ont été supprimés avec succès." });
        });
    } catch (err) {
        console.error("Erreur lors de la suppression :", err);
        res.status(500).send({ message: "Erreur serveur", error: err });
    }
});


app.listen(3000, () =>
    console.log("Running in the port 3000")
);