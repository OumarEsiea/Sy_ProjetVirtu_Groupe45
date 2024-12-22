<template>
  <center><AppHeader msg="Memory Game Version VueJs"/></center>
  <GameConfig/>
  <Footer msg="ESIEA 2023"></Footer>
</template>

<script>
import AppHeader from './components/AppHeader.vue'
import GameConfig from './components/GameConfig.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    AppHeader,
    GameConfig,
    Footer
  }
}
</script>