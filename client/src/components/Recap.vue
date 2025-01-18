<template>
    <div class="PokeRecap">
        <div class="Pokemon-list">
            <h1>Apache Cordova <p>{{ message }}</p></h1>
            <h2>Nombre de Victoires : {{ Victoire }}</h2>
            <h2>Nombre de défaites : {{ Defaite }}</h2>
            <ul>
                <li v-for="item in Description" :key="item" @click="showDescription(item)"> 
                    <img :src="item.ImGSrc" :alt="item.Nom"/>
                    {{item.Nom}}
                </li>
            </ul>
            <button :disabled="isTrue != true" @click="get10PreviousPokemons">10 précédents</button>
            <button @click="get10nextPokemons">10 prochains</button>
        </div>
            <div v-if="ShowDesc == true" class="PokemonStats">
                <div v-if="PockemonChoisi" class="PokemonCard">
                    <img :src="PockemonChoisi.ImgArtwork" @click="PokemonCry(PockemonChoisi)" id="Vibration"> <br>
                    Nom : {{PockemonChoisi.Nom}} <br>
                    <span style="font-weight: bold;"> HP : {{PockemonChoisi.HP}} </span> <br>
                    Capacites : {{PockemonChoisi.Capacites}} <br>
                    <span style="font-weight: bold;"> Weight : {{PockemonChoisi.Weight}} </span><br>
                    Ability : {{PockemonChoisi.Ability_name}} <br>
                    id : {{PockemonChoisi.id}} <br>
                </div>
            </div>
    </div>
</template>

<script>
import {crud_ops} from "@/API_CALL/CRUD_ops"

export default {
  name: "RecapVue",
  props: {
  },
        data(){
            return{
                message: 'Liste de Pokémons trouvés',
                Description : [],
                offset:0,
                ShowDesc : false,
                isTrue : false,
                PockemonChoisi : null,
                limit : 10,
                IsEvolution : false,
                Evolution : [],
                result : [],
                resultFinal : [],
                Victoire : Number,
                Defaite : Number
            }
        },
        methods: {
            async getData() {
                this.result = await crud_ops.read()
                console.log("Id de partie "+typeof(this.result))
                
                for (const prop in this.result){
                
                    this.resultFinal = await crud_ops.getRecap(this.result[prop].id)

                    for(const prop in this.resultFinal.details[0]){

                    fetch(`https://pokeapi.co/api/v2/pokemon/${this.resultFinal.details[0][prop]}`)
                    .then(res2 => res2.json())
                            .then(finalRes2 => {
                            console.log(finalRes2)
                                const abilities = {}
                                abilities.Nom = finalRes2.name
                                abilities.HP = finalRes2.stats[0].base_stat
                                abilities.Capacites = finalRes2.moves[0].move.name
                                abilities.Weight = finalRes2.weight
                                abilities.Ability_name = finalRes2.abilities.map(ability => console.log(ability.ability.name))
                                abilities.ImGSrc = finalRes2.sprites.front_default
                                abilities.ImgArtwork = finalRes2.sprites.other["official-artwork"].front_default
                                abilities.Cri = finalRes2.cries
                                abilities.id = finalRes2.id
                                this.Description.push(abilities)
                            })
                }
                }
              },

              async getWin(){
                this.Victoire = await crud_ops.getWS()
              },

              async getLoss(){
                this.Defaite = await crud_ops.getLoss()
              },

              async get10nextPokemons(){
                this.offset += this.limit;
                await this.getData();
                this.isTrue = true;
            },

            async get10PreviousPokemons(){
                if (this.offset >= this.limit) {
                    this.offset -= this.limit;
                await this.getData();
            }
        },

            showDescription(pokemon){
                this.ShowDesc = true
                console.log(this.ShowDesc)
                this.PockemonChoisi = pokemon
            },

            PokemonCry(pokemon){                
                console.log(pokemon.Cri.latest)
                
                var audio = new Audio(pokemon.Cri.latest)
                
                audio.play()
            },

            Vibrate(id){
                let element = document.getElementById(id);
                let posX = 0;
                let posY = 0;

                function vibrate() {
                    posX = Math.floor(Math.random() * 5) - 2;
                    posY = Math.floor(Math.random() * 5) - 2;
                    element.style.transform = `translate(${posX}px, ${posY}px)`;
                }

                function stopVibration() {
                    clearInterval(interval);
                    element.style.transform = 'translate(0, 0)';
                }

                let interval = setInterval(vibrate, 50);
                setTimeout(stopVibration, 2000);
            },
        },

        mounted() {
            this.getData()
            this.getWin()
            this.getLoss()
          }
}
</script>

<style>

@media screen and (prefers-color-scheme: dark) {
    body {
        background-image:linear-gradient(to bottom, #585858 0%, #1B1B1B 51%);
        background-repeat: no-repeat;
    }
}

.PokeRecap{
    display: flex;
    justify-content: space-between;
}

.Pokemon-list {
    width: 50%;
    margin-left: 25px;
  }
  
  .PokemonStats {
    margin-top: 20px;
    width: 50%;
    color: wheat;
  }

  .PokemonStats img {
    width: 35%;
  }

.Pokemon-list ul {
    flex-direction: column;
    color: white;
}

.Pokemon-list img {
    width: 100px;
    margin-left: 175px;
}

.PokemonCard{
    color: wheat;
}
</style>