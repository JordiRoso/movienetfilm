
import React, { useEffect, useState } from "react";
import UserService from "../../_services/UserService";

import { Navigate, useNavigate } from "react-router-dom";
import {updateMovies} from "../../features/login/authSlice";
import { useSelector, useDispatch } from "react-redux";

export default function User() {
   const user = useSelector((state) =>state.auth.user);
   const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
   const dispatch = useDispatch();
   const moviesUser = useSelector((state)=> state.auth.movies);
   const navigate = useNavigate();


   
   useEffect(() => {
    if(isLoggedIn){
      try {
         UserService.getMoviesFromUser(user.name).then((res) =>{
            console.log(res.data.movies);
            dispatch(updateMovies([...res.data.movies]));
         });
      }catch (error){
         console.log(error);
      }
    } else {
      alert("necesitas hacer login");
      navigate("/login");
    }
   }, []);

   
   
  

   

   return (
      <div>
         <h2>moviesUser {user.name}</h2>
         <h1>13</h1>

         
            {moviesUser.map((movie) => (
               <div key={movie._id}>
                  {movie.title}
                  <img 
                  src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`}
                  className="img-fluid mb-4 mb-md-0"
                   alt="" 
                   />
                  
                </div>
            ))}
         </div>

         
      
   );
}


// import React, { useEffect, useState } from "react";
// import UserService from "../../_services/UserService";
// import TokenStorageService from "../../_services/TokenStorageService";
// import { Navigate, useNavigate } from "react-router-dom";

// export default function User() {
//   const navigate = useNavigate();
//   const token = TokenStorageService.getToken();
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     getAllUsers(token);
//   }, []);

//   // functions definition
//   const getAllUsers = async (token) => {
//     try {
//       const res = await UserService.getAllUsers(token);
//       setUsers(res.data.data);
//     } catch (error) {
//       console.log(error.message || error);
//     }
//   };

//   const handleLogout = () => {
//     TokenStorageService.logOut();
//     navigate("/");
//   };
//   const handleDelete = async(userToDelete) => {
//     const res = await UserService.deleteUser(userToDelete);
//     console.log(res);
//     await getAllUsers(token);
//     console.log(users);
//   }
  

  

//   return (
//     <div>
//       <h2>admin</h2>
//       <h1>12</h1>

//       <div>
//         {users?.map((user) => (
//           <div key={user._id}>
//             <ol>
//               <li>{user.name}</li>
//               <li>{user.email}</li>
//               <li>{user.role}</li>
//             </ol>
//             <div className="admin-buttons">
//                 <button onClick={()=>{handleDelete(user)}} className='delete-user'>borrar</button>
//               </div>
//           </div>
//         ))}
//       </div>

//       <button onClick={handleLogout}>Logout </button>
//     </div>
//   );
// }
