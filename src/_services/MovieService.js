import axios from "axios";
import { environment } from "../_environmets/environment";

const MovieService = {};

MovieService.getAllMovies = async (page = 1) => {
   const apiUrl = `${environment.BASE_API_URL}/movies`;

   return await axios.get(apiUrl);
};

MovieService.getSingleMovie = async (id) => {
   const apiUrl = `${environment.BASE_API_URL}/movies/${id}`;

   return await axios.get(apiUrl);
};

// MovieService.getSingleMovie = async (id) => {
//    const apiUrl = `${environment.BASE_API_URL}/movies/${id}`;

//    return await axios.get(apiUrl);
// };


MovieService.getNameMovie = async (movietitle) => {
   const apiUrl = `${environment.BASE_API_URL}/movies/${movietitle}`;

   return await axios.get(apiUrl);
};




export default MovieService;
