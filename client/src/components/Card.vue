<template>
  <div class="game-card">
    <div class="info">
      <h4>Victoire : {{ Victoire }}</h4>
      <h4 v-if="DefaitePartielle">Défaite : 1</h4>
      <h4 v-else>Defaite : {{ Defaite }} </h4>
      <p>Nombre de bonnes Paires trouvées : {{ BonnePaire }}</p>
      <p>Nombre de paires erronées : {{ FaussePaire }}</p>
      <p>id : {{ id }}</p>
      <button @click="GetCards">Cartes</button>
      <div class="flex-containerCard">
        <div v-if="Defaite">
          <p>Liste des paires erronnées</p>
            <div v-for="(groupe, groupeIndex) in tabCartesParGroupes" :key="groupeIndex" class="flex-itemCard-group">
              <p>Paire {{ groupeIndex+1 }}</p>
                <div v-for="(Image, index) in groupe" :key="index" class="flex-itemCard">
                  <img :src="Image" alt="Image de carte" />
                </div>
            </div>
        </div>
        <div v-else
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
    DefaitePartielle: { type: Boolean },
    BonnePaire: { type: Number },
    FaussePaire: { type: Number },
  },
  data() {
    return {
      tabCartes: [],
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
      } else if (this.DefaitePartielle) {
        const response = await crud_ops.getErreurPart(this.id);
        if (response && response.length > 0) {
          const gameData = response[0];
          this.tabCartes = [
            gameData.ImGSrcCarte1,
            gameData.ImGSrcCarte2,
            gameData.ImGSrcCarte3,
          ];
        }
      } else if (this.Victoire) {
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
    splitIntoChunks(array, chunkSize) {
      const chunks = [];
      for (let i = 0; i < array.length; i += chunkSize) {
        chunks.push(array.slice(i, i + chunkSize));
      }
      return chunks;
    },
  },
  computed: {
    tabCartesParGroupes() {
      return this.splitIntoChunks(this.tabCartes, 2);
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
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center; 
  align-items: center;
  max-height: 300px; 
  overflow-y: auto;
  padding: 5px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.flex-itemCard-group {
  display: flex;
  gap: 5px; 
  margin-bottom: 5px;
}

.flex-itemCard {
  width: 55px;
  height: 55px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.flex-itemCard img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain; /* Garde les proportions */
  margin: 0; /* Enlève tout espace ajouté autour des images */
}

</style>
