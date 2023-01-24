import axios from "axios";
import { environment } from "../_environmets/environment";

const AuthService = {};

const authApiUrl = environment.BASE_API_URL + "/auth";

AuthService.login = async (credentials) => {
   return await axios.post(authApiUrl + "/login", {
      email: credentials.email,
      password: credentials.password,
   });
};

// AuthService.login = async (credentials1) => {
//    return await axios.post(authApiUrl + "/login", {
//       email: credentials1.email,
//       password: credentials1.password,
//       password2: credentials1.password2,
//    });
// };



AuthService.register = async (user) => {
   return await axios.post(authApiUrl + "/register", {
      // name: user.name,
      email: user.email,
      password: user.password,
      name: user.name
   });
};

export default AuthService;
