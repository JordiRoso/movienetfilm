import React, { useEffect, useState } from "react";
import UserUpService from "../../_services/UserUpService";
import TokenStorageService from "../../_services/TokenStorageService";
import { Navigate, useNavigate } from "react-router-dom";

export default function User() {
   const navigate = useNavigate();
   const token = TokenStorageService.getToken();
   const [users, setUsers] = useState([]);

   useEffect(() => {
    postAllUsers(token);
   }, []);

   // functions definition
   const postAllUsers = async (token) => {
      try {
         const res = await UserUpService.postAllUsers(token);
         setUsers(res.data.results);
      } catch (error) {
         console.log(error.message || error);
      }
   };

   const handleLogout = () => {
      TokenStorageService.logOut();
      navigate("/");
   };

   return (
      <div>
         <h2>User</h2>
         <h1>13</h1>

         <div>
            {users.map((user) => (
               <div key={user._id}>
                  <ol>
                    <li>{user.name}</li>
                    <li>{user.email}</li>
                  </ol>
                
                </div>
            ))}
         </div>

         <button onClick={handleLogout}>Logout </button>
      </div>
   );
}
