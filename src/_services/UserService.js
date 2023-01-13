import axios from "axios";
import { environment } from "../_environmets/environment";

const UserService = {};

UserService.getAllUsers = async (token) => {
   const apiUrl = environment.BASE_API_URL + "/users";

   const config = {
      headers: { Authorization: `Bearer ${token}` },
   };

   return await axios.get(apiUrl, config);
};

export default UserService;
