import Axios from "./caller_service";

// Definition des methodes CRUD

let create = (obj) =>{
    return Axios.post('/register',obj)
}

let read = async () => {
    try {
        const response = await Axios.get('/games');
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des jeux :", error);
        throw error;
    }
};

let remove = (id) =>{
    Axios.delete(`/delete/${id}`)
    .then(() => {
        alert("Jeu supprimé avec succès !");
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression :", error);
        alert("Une erreur est survenue.");
      })
}

let getCards = async (id)=>{
    try {
        const response = await Axios.get(`/pokemonList/${id}`);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des jeux :", error);
        throw error;
    }
}

let getCries = async (pokemon)=>{
    
    try {
        let sound = await fetch(`https://play.pokemonshowdown.com/audio/cries/${pokemon.Nom}.ogg`)
        .then(response => response.url)
        return sound
        
    } catch (error) {
        console.error("Erreur lors de la récupération des jeux :", error);
        throw error;
    }
}

let getErreur = async(id) => {
    try {
        const response = await Axios.get(`/Defaite/${id}`);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des jeux :", error);
        throw error;
    }
}

let getErreurPart = async (id) => {
    try {
        const response = await Axios.get(`/DefaitePart/${id}`);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des jeux :", error);
        throw error;
    }
}

let getRecap = async (id) => {
    try {
        const response = await Axios.get(`/Recap/${id}`);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des jeux :", error);
        throw error;
    }
}

let getWS = async ()=>{
    try {
        const response = await Axios.get('/GetWins');
        return response.data[0].Victoire;
    } catch (error) {
        console.error("Erreur lors de la récupération des jeux :", error);
    }
}

let getLoss = async ()=>{
    try {
        const response = await Axios.get('/GetLosses');
        return response.data[0].Defaite;
    } catch (error) {
        console.error("Erreur lors de la récupération des jeux :", error);
    }
}
/*
let update = () =>{ //Non complété par manque de temps
    Axios.put()
}
    */

export const crud_ops = {
    create,
    read,
    remove,
    getCards,
    getCries,
    getErreur,
    getErreurPart,
    getRecap,
    getWS,
    getLoss
}