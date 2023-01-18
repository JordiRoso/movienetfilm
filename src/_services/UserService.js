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
      const apiUrl = `${environment.BASE_API_URL}/users/update/${user.id}`;
      const res = await axios.patch(apiUrl,movie);

      return res.data;
   } catch(error){
      console.log(error);
   }
};

UserService.deleteMovie = async (user, movieId) => {
   try{
      const apiUrl = `${environment.BASE_API_URL}/users/${user._id}/deleteMovie/${movieId}`;
      const res = await axios.delete(apiUrl);

      return res.data;

   }catch (error){
      console.log(error);

   }
};


UserService.deleteUser = async (user) => {
   try{
      const apiUrl = `${environment.BASE_API_URL}/users/delete/${user._id}`;
      const res = await axios.delete(apiUrl);

      return res.data;

   }catch (error){
      console.log(error);

   }
};






export default UserService;
