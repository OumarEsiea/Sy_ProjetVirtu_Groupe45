<template>
<meta charset="utf-8">
<nav id="versions">
  <ul>
    <li>{{ msg }}</li>
    <li>V1</li>
    <li>V2</li>
    <li>V3</li>
    <li style="color: black">V4</li>
    <li><img src="favicon.ico" class="fade"></li>
  </ul>
</nav>

</template>

<script>
export default {
  name: 'AppHeader',
  props: {
    msg: String
  }
}
</script>

<style>
#versions{
  background-color: orange;
  color: white;
  font-weight: bold;
}

</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->