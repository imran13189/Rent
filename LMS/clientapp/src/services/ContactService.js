import axios from "axios";
import Config from "./config";
const url = Config.baseurl;

class ContactService {
  constructor() {}
  SaveContact = async (contact) => {
    const res = await axios.post(`${url}/api/SaveContact`, contact);
    return res.data;
  };

  UpdateContact = async (contact) => {
    const res = await axios.post(`${url}/api/UpdateContact`, contact);
    return res.data;
  };


  GetContacts = async (userId) => {
    const res = await axios.get(`${url}/api/GetContacts`, {
      params: { userId: userId },
    });
    return res.data;
  };

  GetDashboard = async (userId) => {
    const res = await axios.get(`${url}/api/GetDashboard`, {
      params: { userId: userId },
    });
    return res.data;
  };

  GetStates = async () => {
    const res = await axios.get(`${url}/api/GetStates`);
    return res.data;
  };

  GetStatus = async () => {
    const res = await axios.get(`${url}/api/GetStatus`);
    return res.data;
  };
}

export default new ContactService();
