import axios from "axios";
import { environment } from "../_environmets/environment";

const UserUpService = {};

UserUpService.postAllUsers = async (token) => {
   const apiUrl = environment.BASE_API_URL + "/register";

   const config = {
      headers: { Authorization: `Bearer ${token}` },
   };

   return await axios.post(apiUrl, config);
};

export default UserUpService;
