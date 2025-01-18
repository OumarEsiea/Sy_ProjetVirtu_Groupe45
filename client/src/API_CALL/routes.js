import GameConfig from "@/components/GameConfig.vue";
import Recap from "@/components/Recap.vue"
import { createRouter } from 'vue-router'
import { createWebHistory } from 'vue-router'

const routes = [
    {
        path : "/Recapitulatif", 
        name : "Recapitulatif",
        component: Recap
    },
    {
        path : "/GameConfig",
        name : "GameConfig",
        component : GameConfig
    }
];

const router = createRouter({
    history : createWebHistory(),
    routes
})

export default router 