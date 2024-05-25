import axios from "axios";
import Config from "./config";
import Auth from "./Auth";
const url = Config.baseurl;

class UserService {
    constructor() { }

    getLocations = async (event) => {
        console.log(process.env.REACT_APP_API_KEY);
        const res = await axios.get(`${url}GetLocations?Search=${event.target.value}`);
        return res.data;
    };

    getCities = async () => {
        console.log(process.env.REACT_APP_API_KEY);
        const res = await axios.get(`${url}GetCities`);
        return res.data;
    };
    
}

export default new UserService();
