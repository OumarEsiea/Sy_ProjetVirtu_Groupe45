<template>
    <div className="game-card">
            <div className="info">
                <h4>Victoire : {{ Victoire }}</h4>
                <p>Defaite : {{ Defaite }}</p>
                <p>Nombre de bonnes Paires trouvées : {{ BonnePaire }}</p>
                <p>Nombre de paires erronnes : {{ FaussePaire }}</p>
                <button @click="DeleteCard">Supprimer</button>
            </div>
        </div>
  </template>
  
  <script>
  import {crud_ops} from "@/API_CALL/CRUD_ops";
  
  export default {
    name: "CardStats",
    props: {
      id: { type: Number, required: true},
      Victoire: { type: Boolean},
      Defaite: { type: Boolean},
      BonnePaire: { type: Number},
      FaussePaire : { type: Number}
      
    },
    methods: {
      DeleteCard() {
        console.log("Suppression du jeu avec l'ID : ", this.id);
        crud_ops.remove(this.id)
      },
    },
  };
  </script>
  
  <style scoped>
  .game-card {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 15px;
    margin: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: #fff;
    color: black;
  }
  
  .game-card .info h4 {
    margin: 0;
    font-size: 1.2em;
  }
  
  .game-card .info p {
    margin: 5px 0;
  }
  
  .game-card .actions button {
    margin-top: 10px;
    padding: 8px 12px;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    background-color: #f44336;
    color: black;
  }
  </style>
  