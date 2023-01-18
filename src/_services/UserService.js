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

UserService.rentMovie = async (user, movie) =>{
   try{
      const apiUrl = `${enviroment.BASE_URL}/users/update/${user.id}`;
      const res = await axios.patch(apiUrl,movie);

      return res.data;
   } catch(error){
      console.log(error);
   }
};


export default UserService;
