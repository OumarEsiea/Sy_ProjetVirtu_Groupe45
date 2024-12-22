import axios from "axios";

//Definition de l'url utilisé pour communiquer avec l'API

const Axios = axios.create({
    baseURL: 'http://localhost:3000'
})

export default Axios