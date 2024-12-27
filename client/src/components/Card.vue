<template>
    <div className="game-card">
            <div className="info">
                <h4>Victoire : {{ Victoire }}</h4>
                <h4>Defaite : {{ Defaite }}</h4>
                <p>Nombre de bonnes Paires trouvées : {{ BonnePaire }}</p>
                <p>Nombre de paires erronnes : {{ FaussePaire }}</p>
                 <p>id : {{ id }}</p>
                <button @click="GetCards">Cartes</button>
                <div class="flex-containerCard">
                  <ul class="flex-itemCard">
                    <li v-for="(Image, index) in tabCartes" :key="index">
                      <img :src="Image" alt="Image de carte" />
                    </li>
                  </ul>
                </div>
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
    data() {
    return {
    tabCartes: []  // Déclarez tabCartes comme un tableau vide
      };
    },
    methods: {
      DeleteCard() {
        console.log("Suppression du jeu avec l'ID : ", this.id);
        crud_ops.remove(this.id)
      },
      async GetCards(){
        const response = await crud_ops.getCards(this.id)
        if (response && response.length > 0) {
            const gameData = response[0]; // Suppose qu'il y a un seul objet pour l'ID
            console.log(gameData)
            this.tabCartes = [
                gameData.ImGSrcCarte1,
                gameData.ImGSrcCarte2,
                gameData.ImGSrcCarte3
            ];
        }
        //this.tabCartes = response.map(card => card.ImGSrc);
      }
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
    margin: 5px;
  }
  
  .game-card .actions button {
    margin-top: 10px;
    padding: 10px;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    background-color: #f44336;
    color: black;
  }

  .flex-containerCard {
    display: flex;
    flex-direction: column; /* Dispose les éléments verticalement */
    align-items: center;    /* Centre les éléments horizontalement */
    justify-content: center; /* Aligne les éléments au début verticalement */
    width: 100%;            /* Force la largeur maximale du conteneur */
    padding: 10px;
    gap: 10px;              /* Ajoute de l'espace entre les images */
    overflow: hidden;       /* Empêche les éléments de déborder */
    box-sizing: border-box; /* Inclut le padding dans les dimensions */
}


.flex-itemCard {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    width: auto;            /* Ajuste la largeur de l'élément */
    height: auto;           /* Ajuste la hauteur automatiquement */
    margin: 10px;         /* Ajoute de l'espace entre les cartes */
    border-radius: 10px;
    background-color: #f0f0f0;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.flex-itemCard img {
    width: 40px; /* Taille fixe pour chaque image */
    height: 40px; /* Taille fixe */
    object-fit: contain; /* Assure un ajustement sans déformation */
}

img {
    max-width: 100px;      /* Largeur maximale pour les images */
    max-height: 100px;     /* Hauteur maximale */
    object-fit: contain;   /* Préserve les proportions de l'image */
    margin: auto;
}

</style>
  