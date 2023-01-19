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

UserService.rentMovie = async (userId, movieId) =>{
   try{
      const apiUrl = `${environment.BASE_API_URL}/users/users/${userId}/rent/${movieId}`;
      const res = await axios.patch(apiUrl);

      return res.data;
   } catch(error){
      console.log(error);
   }
};

UserService.deleteMovie = async (userId, movieId) => {
   try{
      const apiUrl = `${environment.BASE_API_URL}/users/users/${userId}/delete/${movieId}`;
      const res = await axios.patch(apiUrl);

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

UserService.getMoviesFromUser = async (username) => {
   const apiUrl = `${environment.BASE_API_URL}/users/${username}`;
   const res = await axios.get(apiUrl);
   return res.data;
}






export default UserService;
