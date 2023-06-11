import axios from "axios";
import Config from "./config";
//import Auth from "./Auth";
const url = Config.baseurl;

class UserService {
    constructor() { }

    getLocations = async (event) => {
        const res = await axios.get(`${url}GetLocations?Search=${event.target.value}`);
        return res.data;
    };
    
}

export default new UserService();
