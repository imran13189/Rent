import axios from "axios";
import Config from "./config";
const url=Config.baseurl;

class AuthService
{
    constructor() { }
    Login=async (User)=>{
        
        const res= await axios.post(`${url}/api/Login`, User);
        return res.data;
    }

    PasswordReset=async (User)=>{
        const res= await axios.post(`${url}/api/PasswordReset`, User);
        return res.data;
    }
}

export default new AuthService();