<template>
    <main>
        <section>
            <h1 style="color: red; font-style: italic;" class="fade">Memory Game</h1>

            <label for="size">Taille du jeu</label>
            <input type="number" v-model.number="Taille_Jeu" />

            <label for="timer2">Temps imparti</label>
            <input type="number" v-model.number="TpsJeu" @input="validateMemoTime" />

            <label for="timer">Temps de Mémorisation</label>
            <input type="number" v-model.number="Tps_Memo" @input="validateMemoTime" />

            <p v-if="showError" style="color: red;">
                Le Temps de Mémorisation ne peut pas être supérieur au Temps imparti !
            </p>

            <GamePlay v-if="!showError" :Taille="Taille_Jeu" :Memo="Tps_Memo" :Temps="TpsJeu"/>

        </section>
    </main>
    <Footer></Footer>
</template>

<script>
import GamePlay from './GamePlay.vue';
import Footer from './Footer.vue'

export default {
    name: 'GameConfig',
    components: { 
        GamePlay,
        Footer
     },
    data() {
        return {
            Taille_Jeu: '',
            Tps_Memo: '',
            TpsJeu: ''
        };
    },
    computed: {
        showError() {
            return this.Tps_Memo > this.TpsJeu;
        }
    },
    methods: {
       
        validateMemoTime() {
            if (this.Tps_Memo > this.TpsJeu) {
                this.Tps_Memo < this.TpsJeu;
            }
        }
    }
};
</script>