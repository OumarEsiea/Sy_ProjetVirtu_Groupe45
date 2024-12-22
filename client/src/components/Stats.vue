<template>
  <div>
    <button v-on:click="Stats()">Statistiques</button>
    <div class="cards">
      <Card
        v-for="game in games"
        :key="game.id"
        :id="game.id"
        :Victoire="game.Victoire"
        :Defaite="game.Defaite"
        :BonnePaire="game.BonnePaire"
        :FaussePaire="game.FaussePaire"
      />
    </div>
  </div>
</template>

<script>
import Card from './Card.vue';
import { crud_ops } from "@/API_CALL/CRUD_ops";

export default {
  name: 'StatsPage',
  components: { Card },
  data() {
    return {
      games: [],
      loading: false
    };
  },
  methods: {
    async getStatistics() {
      this.loading = true;
      try {
        this.games = await crud_ops.read();
      } catch (error) {
        console.error("Erreur lors de la récupération des statistiques :", error);
      } finally {
        this.loading = false;
      }
    },
    Stats() {
      this.getStatistics();
    }
  }
};
</script>

<style scoped>
.cards {
  display: flex;
  flex-wrap: nowrap;
  gap: 10px;
  justify-content: space-evenly;
  overflow-x: auto;
}

.game-card {
  flex: 1 1 auto;
  max-width: 300px;
  min-width: 200px;
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
</style>
