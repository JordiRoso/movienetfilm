// import React from "react";
// import PropTypes from "prop-types";
// import { useNavigate } from "react-router-dom";
// import { environment } from "../../_environmets/environment";
// import { format } from "date-fns";
// import "./Movie.scss";
// import UserService from "../../_services/UserService";
// import styled from "styled-components";
// import { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { updateMovies } from "../../features/login/authSlice";
// import { useParams } from "react-router-dom";

// const ModalContainer = styled.div`
//   top: 50%;
//   left: 50%;
//   right: auto;
//   bottom: auto;
//   margin-right: -50%;
//   transform: translate(-50%, -50%);
//   background-color:#d5ed5c ;
//   opacity: 90%;
//   padding: 20px;
//   border-radius: 40px;
//   position: fixed;
//   z-index: 99999;
//   display: flex;
//   flex-direction: column;
//   gap: 13px;
//   width: 90%;
//   height: fit-content;
// `;



// function Movie({ movie }) {
//   const navigate = useNavigate();
//   const isLoggedIn = useSelector((state) => state.auth.user);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const userLogged = useSelector((state) => state.auth.user);
//   const dispatch = useDispatch();

//   const handleMovieClick = () => {
//     setIsModalOpen(true);
//   };

//   const {id} = useParams();

//   // const handleRentMovie = async () => {
//   //  if (isLoggedIn) {
//   //     try {
//   //        const res = UserService.rentMovie(userLogged,movie);
//   //        console.log(res);

//   //        setIsModalOpen(false);
//   //     } catch (error) {
//   //        console.log(error);
//   //     }
//   //  } else {
//   //     alert( "Teneís que estar loogedaos par apoder ALQUILAR PELIS!!!!")
//   //  }
//   // };

//   const handleRegisterRental = async () => {
//     const userId = sessionStorage.getItem("userId");

//     console.log(userId);
//     await UserService.rentMovie(userId, id);
//     navigate("/users");
//   };

//   handlers
//   const getMovieDetails = (movie) => {
//      navigate(`/movies/${movie.id}`);
//   };

//   // const getYear = (date) => format(Date.parse(date), "yyyy");

//   return (
//     <div className="">
//       <div
//         className="card  text-start movie-card"
//         style={{ width: "13rem" }}
//         // onClick={handleMovieClick}
//         onClick={() => getMovieDetails(movie)}
//       >
//         <div className="poster-container">
//           <img
//             src={environment.IMAGES_URL + "/w185" + movie.poster_path}
//             className="card-img-top img-fluid round"
//             alt="..."
//           />
//           <div className="vote-average vote-average--movie">
//             {movie.vote_average}
//           </div>
//         </div>

//         <div className="card-body">
//           <h5 className="card-title mb-2 mt-2 fs-6 fw-bold">{movie.title}</h5>
//           {/* <div className="release-date">{getYear(movie.release_date)}</div> */}
//         </div>
//       </div>
//       {isModalOpen && (
//         <ModalContainer>
//           <strong>ALQUILER</strong>
//           <div className="movie-info">
//             <img
//               className="modal-image"
//               src={environment.IMAGES_URL + "/w185" + movie.poster_path}
//               alt="poster path"
//               width={200}
//             />
//             <div className="movie-info-details">
//               <span className="movie-info-description">AQUI PODEIS ALQUILAR ESTE SUPER FILM</span>
//               <div className="movie-info-description-buttons">
//                 <button onClick={handleRentMovie}>Alquilar</button>
//                 <button onClick={() => setIsModalOpen(false)}>Salir</button>
//                 <button onClick={handleRegisterRental}>Alquilarbunas</button>
//               </div>
//             </div>
//           </div>
//         </ModalContainer>
//       )}
//     </div>
//   );
// }

// Movie.propTypes = {
//   movie: PropTypes.object.isRequired,
// };

// export default Movie;
import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { environment } from "../../_environmets/environment";
import { format } from "date-fns";
import "./Movie.scss";
import UserService from "../../_services/UserService";
// import { useSelector } from "react-redux";
import { useSelector, useDispatch } from "react-redux";

function Movie({ movie }) {
   const navigate = useNavigate();
   // const user = useSelector((state) =>state.auth.user);
   const dispatch = useDispatch();
  const userLogged = useSelector((state) => state.auth.user);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
   

   // handlers
   // const getMovieDetails = (movie) => {
   //    navigate(`/movies/${movie.id}`);
   // };


   // const handleRegisterRental = async () => {
   //    // TokenStorageService.saveToken();
      
   //       //  const userId = sessionStorage.getItem("userId");
          
      
          
   //       //  await UserService.rentMovie(user._id,movie);
   //       //  console.log(movie)
   //        navigate("/user");
   //      };


        const handleRegisterRental= async () => {
         if(isLoggedIn) {
           try {
             const res = await UserService.rentMovie(userLogged, movie);
             console.log(res);
             navigate("/user")
     
             
           } catch (error) {
             console.log(error);
           }
         } else {
           alert("Necesitas iniciar sesión para usar esto.")
         }
       }

   const getYear = (date) => format(Date.parse(date), "yyyy");

   return (
      <div className="">
         <div
            className="card  text-start movie-card"
            style={{ width: "13rem" }}
            // onClick={() => getMovieDetails(movie)}
         >
            <div className="poster-container">
               <img
                  src={environment.IMAGES_URL + "/w185" + movie.poster_path}
                  className="card-img-top img-fluid round"
                  alt="..."
               />
               <div className="vote-average vote-average--movie">
                  {movie.vote_average}
               </div>
            </div>

            <div className="card-body">
               <h5 className="card-title mb-2 mt-2 fs-6 fw-bold">
                  {movie.title}
               </h5>
               <div className="release-date">{getYear(movie.release_date)}</div>
               <div className="movie-info-description-buttons">
              
                <button onClick={handleRegisterRental}>Alquilar Pelis</button>
              </div>
            </div>
         </div>
      </div>
   );
}

Movie.propTypes = {
   movie: PropTypes.object.isRequired,
};

export default Movie;
