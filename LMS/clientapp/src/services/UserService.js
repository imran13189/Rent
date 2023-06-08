import axios from "axios";
import Config from "./config";
const url=Config.baseurl;

class UserService
{
    constructor() { }
    SaveUser=async (user)=>{
       
        const res= await axios.post(`${url}/api/SaveUser`, user);
        return res.data;
    }

    GetUsers=async ()=>{
      
        const res= await axios.get(`${url}/api/GetUsers`);
        return res.data;
    }

    GetRoles=async ()=>{
      
        const res= await axios.get(`${url}/api/GetRoles`);
        return res.data;
    }
}

export default new UserService();