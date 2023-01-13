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

AuthService.register = async (user) => {
   return await axios.post(authApiUrl + "/register", {
      name: user.name,
      email: user.email,
      password: user.password,
   });
};

export default AuthService;
