import Axios from "./caller_service";

let create = (obj) =>{
    return Axios.post('/register',obj)
}

let read = async () => {
    try {
        const response = await Axios.get('/games');
        return response.data; // Retourne directement les données
    } catch (error) {
        console.error("Erreur lors de la récupération des jeux :", error);
        throw error; // Permet à l'appelant de gérer l'erreur
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
/*
let update = () =>{
    Axios.put()
}
    */

export const crud_ops = {
    create,
    read,
    remove
}