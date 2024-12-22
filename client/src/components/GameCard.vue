<template>
  <li class="flex-item">
    <img :src="card.ImGSrc" v-on:click="IdChange()">
  </li>
</template>

<script>
export default {
  name: 'GameCard',
  props: {
    cardId: { type: String, default: "0" },
    imageId: { type: String, default: "10" },
    choix: { type: String, default: "" },
    watcherNeeded: { type: Boolean, default: true }
  },
  data() {
    return {
      card: this.cardId,
      image: this.cardId,
      click: 0,
      Choix: Object,
      Pokeball: {
        ImGSrc: "Pokeball.png"
      },
      isActive: true,
    };
  },
  watch: {
    choix(newValue) {
      if (!this.watcherNeeded) return;
      if (newValue === 'Mauvais') {
        setTimeout(() => {
          this.card = this.Pokeball;
          this.isActive = true; 
        }, 1000);
      }
    },
  },
  methods: {
    IdChange() {
      if (this.click === 0 && this.isActive) {
        this.click++;
        this.card = this.imageId;
        this.$emit('VerifChoix', this.Choix = { choix: this.click, card: this.imageId });
      }
    },
  }
};
</script>
