<template>
  <div class="game-card">
    <div class="info">
      <h4>Victoire : {{ Victoire }}</h4>
      <h4>Defaite : {{ Defaite }}</h4>
      <p>Nombre de bonnes Paires trouvées : {{ BonnePaire }}</p>
      <p>Nombre de paires erronnées : {{ FaussePaire }}</p>
      <p>id : {{ id }}</p>
      <button @click="GetCards">Cartes</button>
      <div class="flex-containerCard">
        <div
          v-for="(Image, index) in tabCartes" :key="index" class="flex-itemCard">
          <img :src="Image" alt="Image de carte" />
        </div>
      </div>
      <button @click="DeleteCard">Supprimer</button>
    </div>
  </div>
</template>

<script>
import { crud_ops } from "@/API_CALL/CRUD_ops";

export default {
  name: "CardStats",
  props: {
    id: { type: Number, required: true },
    Victoire: { type: Boolean },
    Defaite: { type: Boolean },
    DefaitePartielle: {type : Boolean},
    BonnePaire: { type: Number },
    FaussePaire: { type: Number },
  },
  data() {
    return {
      tabCartes: [], // Tableau contenant les images
    };
  },
  methods: {
    DeleteCard() {
      crud_ops.remove(this.id);
    },
    async GetCards() {
      if (this.Defaite) {
        const response = await crud_ops.getErreur(this.id);
        if (response && response.length > 0) {
          const gameData = response[0];
          this.tabCartes = [
            gameData.ImGSrcCarte1,
            gameData.ImGSrcCarte2,
            gameData.ImGSrcCarte3,
            gameData.ImGSrcCarte4,
            gameData.ImGSrcCarte5,
            gameData.ImGSrcCarte6,
          ];
        }
      }
      else if(this.DefaitePartielle){
      const response = await crud_ops.getErreurPart(this.id);
      if (response && response.length > 0) {
          const gameData = response[0];
          this.tabCartes = [
            gameData.ImGSrcCarte1,
            gameData.ImGSrcCarte2,
            gameData.ImGSrcCarte3,
          ];
        }
        }
      else if(this.Victoire) {
        const response = await crud_ops.getCards(this.id);
        if (response && response.length > 0) {
          const gameData = response[0];
          this.tabCartes = [
            gameData.ImGSrcCarte1,
            gameData.ImGSrcCarte2,
            gameData.ImGSrcCarte3,
          ];
        }
      }
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
  background: #fff;
  color: black;
}

.game-card .info h4,
.game-card .info p {
  margin: 5px 0;
}

button {
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #000;
  border-radius: 5px;
  cursor: pointer;
}

.flex-containerCard {
  display: flex;
  flex-wrap: wrap; /* Les cartes passent à la ligne si nécessaire */
  gap: 10px; /* Espacement entre les éléments */
  justify-content: center; /* Alignement horizontal */
  align-items: center;
  max-height: 300px; /* Limite la hauteur visible */
  overflow-y: auto; /* Permet le scroll vertical */
  padding: 10px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.flex-itemCard {
  width: 50px; /* Taille des cartes */
  height: 50px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.flex-itemCard img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain; /* Garde les proportions */
}
</style>
