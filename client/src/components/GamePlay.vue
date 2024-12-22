  <template>
    <nav class="Jeu">
                  <p id ="Size">Size : 0</p>
                  <p id ="Timer">Timer : 0</p>
                  <p>Vie(s) : {{ Vies }}</p>
                  <p>Paires trouvées : {{ Paires }}</p>
                  <p>Temps de Mémorisation : {{ Tps_Memo }}</p>
                  <p v-if="horloge <10" class="Alerte"> 0 : {{ horloge }}</p>
                  <p v-else> Temps restant : {{ horloge }}</p>
              </nav>
              
              <div class = "toolbar">
                <div v-if="PartieFinished">
                  <div v-if="Victoire">
                    <span  :class="{fade : Victoire}" style="color: green;">
                      <br> Paires trouvées</span>
                        <TransitionGroup tag="ul" name="rubberband">
                          <li v-for="Paires in Paires_trouve" :key="Paires.id">
                            {{ Paires.Nom }}
                              <img :src="Paires.ImGSrc" @load="PokemonCry(Paires)">
                          </li>
                        </TransitionGroup>
                   </div>
                     <div v-else><span :class="{fade : !Victoire}" style="color: red">
                       <br> Defaite ! Vous avez échoué ! </span>
                  </div>
                </div>
                  <ul>
                      <li><button :disabled="isTrue == true" v-on:click="startGame()">Play</button></li>
                      <li><button v-on:click="Restart()">Restart</button></li>       
                  </ul>
                  <div class="flex-container" v-if="ChargerJeu">
                    <TransitionGroup name="list" tag="ul">
                      <GameCard v-for="(Image,Indice) in game" :key="Image" :cardId="Image" :imageId="Indice_Previous[Indice]" 
                       @VerifChoix="GestionChoix" :choix="Decision" :watcherNeeded="NeedWatcher"/>
                    </TransitionGroup>  
                  </div>
              </div>
  </template>

  <script>
  import GameCard from './GameCard.vue'
  import {crud_ops} from "@/API_CALL/CRUD_ops"
  
  export default{
      name:'GamePlay',
      props : {
        Taille : Number,
        Memo : Number,
        Temps : Number,
      },
      components: {GameCard},

      watch: {
    Taille(newValue) {
      this.Jeu = newValue;
      this.$emit('update:Taille', newValue);
    },
    Memo(newValue) {
      this.Tps_Memo = newValue;
      this.$emit('update:Memo', newValue); 
    },
    Temps(newValue) {
      this.horloge = newValue;
      this.$emit('update:Temps', newValue);
    },
    Victoire(newValue){
      this.Victoire = newValue
      this.Statistics()
    },
    Defaite(newValue){
      this.Defaite = newValue
      this.Statistics()
    }
  },

      data() {
          return {
              Jeu : this.Taille,
              isTrue : false,
              game: [],
              Indice_Previous : [],
              Paires_trouve : [],
              TmpTrouve : [],
              ChargerJeu : false,
              Premier_choix : 0,
              Deuxieme_choix : 0,
              Tps_Memo : this.Memo,
              horloge : this.Temps,
              Carte_Selec : 0,
              Vies : 3,
              Paires : 0,
              Victoire : false,
              Defaite : false,
              PartieFinished : false,
              Decision : '',
              WrongPaire : [],
              MauvaisePaire : 0,
              blocage: false,
              NeedWatcher: true
          }
      },

  methods: {

    startGame() {
      this.isTrue = true
      this.Init()
      setTimeout(() => {
        this.Shuffle()
        this.ChargerJeu = true
        this.HideAll()
        this.MemoAffichage()
        setInterval(() => {
          this.Timer()
        }, 1000)
      }, 1000)
    },

    Init(){
      
      fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${Math.floor((Math.random() * 10) + 1)}&limit=${this.Jeu}`)
                  .then(res => res.json())
                  .then(finalRes => {      
                      const pokemons = finalRes.results.map(pokemon => fetch(pokemon.url)
                      .then(res=> res.json()
                      .then(finalRes2 => {
                      const Pokemon = {}
                      Pokemon.Nom = finalRes2.name
                      Pokemon.ImGSrc = finalRes2.sprites.front_default
                      Pokemon.ImgArtwork = finalRes2.sprites.other["official-artwork"].front_default
                      Pokemon.id = finalRes2.id 
                      this.game.push(Pokemon)
                      this.game.push(Pokemon)           
                      console.log(Pokemon)
                        })
                     ))
                    Promise.all(pokemons)
                  })
  },

    Shuffle(){
      for (let i = this.game.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        ([this.game[i], this.game[j]] = [this.game[j], this.game[i]]);
      }  

    },
        getCardId(){
        this.game.forEach((Elem) =>{
        this.Indice_Previous.push(Elem)
        })
      },

      HideAll(){
          setTimeout(() => {
            this.getCardId()
            const Pokeball = {
              ImGSrc : "Pokeball.png"
            }
            this.game = this.game.map(()=> Pokeball)
          },this.Tps_Memo*1000);
        },

        GestionChoix(data) {
  this.Carte_Selec++;

  if (this.Carte_Selec === 1) {
    this.Premier_choix = data.card;
  } else if (this.Carte_Selec === 2) {
    this.Deuxieme_choix = data.card;
  }

  if (this.Carte_Selec === 2) {
    if (this.Premier_choix === this.Deuxieme_choix) {
      this.Paires++;
      this.TmpTrouve.push(this.Premier_choix);
      this.NeedWatcher = false
      this.game.forEach(card => {
        if (card.ImGSrc === this.Premier_choix) {
          card.isActive = false;
        }
      });
    } else {
      this.WrongPaire.push(this.Premier_choix,this.Deuxieme_choix)
      this.MauvaisePaire++
      this.Vies--;
      this.Decision = "Mauvais";

      setTimeout(() => {
        this.WrongPaire.forEach(card => {
            console.log("Cartes incorrectes : "+card)
            card.isActive = true;
        });
        this.Decision = "";
      }, 1000);
    }
    this.NeedWatcher = true
    this.WrongPaire.length = 0
    this.Carte_Selec = 0;
  }

  if (this.Paires === 3) {
    this.PartieFinished = true;
    this.Victoire = true;
    this.Defaite = false
    this.AfficherPairesTrouvees();
  }

  if (this.Vies === 0) {
    this.PartieFinished = true;
    this.Victoire = false;
    this.Defaite = true
    window.alert('Vous avez épuisé toutes vos tentatives.');
    location.reload();
  }
},

      AfficherPairesTrouvees() {
    this.TmpTrouve.forEach((paire, index) => {
      setTimeout(() => {
        this.Paires_trouve.push(paire)
      }, index * 2000)
    })
  },

  PokemonCry(pokemon){                      
   
    const audiourl = require(`@/assets/Audio/Cri_00${pokemon.id}_DP.ogg`)
               
    const audio = new Audio(audiourl)

    audio.play().catch(error => {
        console.error('Error playing audio:', error);
      })
            },

      Timer(){
        this.horloge -- 
        if (this.horloge == -1){
          window.alert('Temps imparti écoulé')
          location.reload()
        }
      },
      
      MemoAffichage() {
      this.Tps_Memo--;
      const intervalId = setInterval(() => {
        this.Tps_Memo--;
        if (this.Tps_Memo <= 0) {
            clearInterval(intervalId);
        }
        }, 1000);
    },
      Restart(){
        location.reload()
      },
    
    Statistics(){
     let Resume = {}

      Resume.Victoire = this.Victoire
      Resume.Defaite = this.Defaite
      Resume.BonnePaire = this.TmpTrouve.length
      Resume.FaussePaire = this.MauvaisePaire
      //this.Paires_trouve.forEach(elem => elem.)
      
      crud_ops.create(Resume)
     
    } 
  }
}
  </script>

  <style>
  button{
      font-size: 20px;
        background-color: white;
        color: black;
        border-radius: 10px;
        margin: 20px;
        cursor: pointer;
  }

  .list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
}

@keyframes rubberband {
  from{
    transform: scale3d(1,1,1);
    opacity: 0;
  }

  30%{
    transform: scale3d(1.25,0.75,1);
  }

  40%{
    transform: scale3d(0.75,1.25,1);
  }

  50%{
    transform: scale3d(1.15,0.85,1);
    opacity: 1;
  }

  65%{
    transform: scale3d(0.95,1.05,1);
  }

  75%{
    transform: scale3d(1.05,0.95,1);
  }

  to {
    transform: scale3d(1,1,1);
  }
}

.rubberband-enter-active {
  animation: rubberband 1s;
}

.rubberband-leave-active{
  animation: rubberband 1s reverse;
}
  </style>