import axios from "axios";
import Config from "./config";
//import Auth from "./Auth";
const url = Config.baseurl;

class PropertyService {
    constructor() { }

    SaveLocation = async (contact) => {
        const res = await axios.post(`${url}SaveLocation`, contact);
        return res.data;
    };

    SaveProperty = async (contact) => {
        debugger;
        const res = await axios.post(`${url}SaveProperty`, contact );
        return res.data;
    };

}

export default new PropertyService();
