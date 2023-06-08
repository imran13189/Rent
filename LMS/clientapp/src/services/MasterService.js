import axios from "axios";
import Config from "./config";
import Auth from "./Auth";
const url = Config.baseurl;

class UserService {
    constructor() { }
    SaveStatus = async (status) => {
        const res = await axios.post(`${url}/api/SaveStatus`, status, {
            headers: Auth.getHeader(),
        });
        return res.data;
    };

    GetStatus = async () => {
        const res = await axios.get(`${url}/api/GetStatus`, {
            headers: Auth.getHeader(),
        });
        return res.data;
    };

    SaveIndustryType = async (status) => {
        const res = await axios.post(`${url}/api/SaveIndustryType`, status, {
            headers: Auth.getHeader(),
        });
        return res.data;
    };

    GetIndustryType = async () => {
        const res = await axios.get(`${url}/api/GetIndustryType`, {
            headers: Auth.getHeader(),
        });
        return res.data;
    };

    SaveBusinessType = async (status) => {
        const res = await axios.post(`${url}/api/SaveBusinessType`, status, {
            headers: Auth.getHeader(),
        });
        return res.data;
    };
    GetBusinessType = async () => {
        const res = await axios.get(`${url}/api/GetBusinessType`, {
            headers: Auth.getHeader(),
        });
        return res.data;
    };

    GetBrands = async () => {
        const res = await axios.get(`${url}/api/GetBrands`, {
            headers: Auth.getHeader(),
        });
        return res.data;
    };

    SaveStatusOrder = async (status) => {
        const data = status.map((item, index) => ({ ...item, ["StatusOrder"]: index }))
         
        const res = await axios.post(`${url}/api/SaveStatusOrder`, data, {
            headers: Auth.getHeader(),
        });
        return res.data;
    };


    SaveBrand = async (brand) => {
        const res = await axios.post(`${url}/api/SaveBrand`, brand, {
            headers: Auth.getHeader(),
        });
        return res.data;
    };
}

export default new UserService();
