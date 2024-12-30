import Axios from "./caller_service";

// Definition des methodes CRUD

let create = (obj) =>{
    return Axios.post('/register',obj)
}

let addDatabase = (obj)=>{
    return Axios.post('/addDatabase',obj)
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
        //console.log(response.data)
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
/*
let update = () =>{ //Non complété par manque de temps
    Axios.put()
}
    */

export const crud_ops = {
    create,
    addDatabase,
    read,
    remove,
    getCards,
    getCries
}