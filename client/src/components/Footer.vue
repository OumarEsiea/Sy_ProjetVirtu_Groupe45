<template>
    <br>
<center>{{ msg }}<br><br>
        {{ date }}
    </center>
<br>
    <center>Veuilez appuyer sur le bouton ci-dessous pour voir vos statistiques</center>
        <Stats></Stats>
    
</template>


<script>
import Stats from './Stats.vue'

export default { 
    name :'FooterGame',
    props : {
        msg : String,
    },
    components : {Stats},
    data (){
        return{
            date : new Date(),
        }
    },
}
</script>

<style>
center{
    font-weight: bold;
    color: white;
}
</style>