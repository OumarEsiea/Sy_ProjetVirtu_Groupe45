<template>
  <center><AppHeader msg="Memory Game Version VueJs"/></center>
  <center><RouterLink to="/Recapitulatif">Recapitulatif</RouterLink></center>
  <center><RouterLink to="/GameConfig"><button> Jouer </button></RouterLink></center>
  <RouterView/>
  <Footer msg="ESIEA 2023"></Footer>
</template>

<script>
import AppHeader from './components/AppHeader.vue'

export default {
  name: 'App',
  components: {
    AppHeader,
  }
}
</script>