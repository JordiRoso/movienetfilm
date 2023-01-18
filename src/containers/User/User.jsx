// import React, { useEffect, useState } from "react"
// import "./User.scss";

// import { useSelector } from "react-redux";
// import Movie from "../components/Movie/Movie";

// export default function User({backstatus}) {
//     const { movies } = useSelector((state)=>state.movies)
//     console.log(movies)
  

//    return (
//       <div className="movie-list">
//         <button onClick={() => backstatus(false)}>volver</button>
//          <div className="container pt-5 pb-5">
//             <h1 className="h1  mb-5 ">Movies</h1>

//             <div className="d-flex flex-wrap justify-content-center gap-5 mb-5">
//                {movies.length > 0 &&
//                   movies.map((movie) => <Movie key={movie.id} movie={movie} />)}
//             </div>
//          </div>
//       </div>
//    );
// }






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
