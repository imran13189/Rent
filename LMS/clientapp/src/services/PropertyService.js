import axios from "axios";
import Config from "./config";
import Auth from "./Auth";
const url = Config.baseurl;

class PropertyService {
    constructor() { }

    SaveLocation = async (contact) => {
        const res = await axios.post(`${url}SaveLocation`, contact,{
            headers: Auth.getHeader()
        });
        return res.data;
    };

    SaveProperty = async (contact) => {
     
        const res = await axios.post(`${url}SaveProperty`, contact,{
            headers: Auth.getHeader()
        } );
        return res.data;
    };

    getProperties = async (params) => {
        const res = await axios.post(`${url}GetProperties`, params,{
            headers: Auth.getHeader()
        });
        return res.data;
    };

}

export default new PropertyService();
