import axios from "axios";
import Config from "./config";
const url=Config.baseurl;

class AccountService
{
    constructor() { }
    SaveAccount=async (account)=>{
       
        const res= await axios.post(`${url}/api/SaveAccount`, account);
        return res.data;
    }

    GetAccounts=async (userId)=>{
      
        const res= await axios.get(`${url}/api/GetAccounts`, {
            params: { userId: userId }
          });
        return res.data;
    }

    GetBusinessType=async ()=>{
      
        const res= await axios.get(`${url}/api/GetBusinessType`);
        return res.data;
    }

    GetContactMode=async ()=>{
      
        const res= await axios.get(`${url}/api/GetContactMode`);
        return res.data;
    }

    GetIndustryType=async ()=>{
      
        const res= await axios.get(`${url}/api/GetIndustryType`);
        return res.data;
    }

    GetContactAccount=async ()=>{
      
        const res= await axios.get(`${url}/api/GetContactAccount`);
        return res.data;
    }
}

export default new AccountService();