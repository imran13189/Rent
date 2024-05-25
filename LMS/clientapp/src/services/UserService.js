import axios from "axios";
import Config from "./config";
//import Auth from "./Auth";
const url = Config.baseurl;

class UserService {
    constructor() { }

    SaveUser = async (user) => {
        const res = await axios.post(`${url}SaveUser`, user);
        return res.data;
    };

    ValidateOTP = async (user) => {
        const res = await axios.post(`${url}ValidateOTP`, user);
        return res.data;
    };

    getProperties = async (params) => {
        const res = await axios.post(`${url}GetProperties`, params);
        return res.data;
    };

}

export default new UserService();
