import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { environment } from "../../_environmets/environment";
import { format } from "date-fns";
import "./Movie.scss";
import UserService from "../../_services/UserService";
import styled from "styled-components";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateMovies } from "../../features/login/authSlice";

const ModalContainer = styled.div`
  top: 50%;
  left: 50%;
  right: auto;
  bottom: auto;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  position: fixed;
  z-index: 99999;
  display: flex;
  flex-direction: column;
  gap: 13px;
  width: 90%;
  height: fit-content;
`;



function Movie({ movie }) {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userLogged = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleMovieClick = () => {
    setIsModalOpen(true);
  };

  const handleRentMovie = async () => {
   if (isLoggedIn) {
      try {
         const res = UserService.rentMovie(userLogged,movie);
         console.log(res);

         setIsModalOpen(false);
      } catch (error) {
         console.log(error);
      }
   } else {
      alert( "Login")
   }
  };

  // handlers
  // const getMovieDetails = (movie) => {
  //    navigate(`/movies/${movie.id}`);
  // };

  // const getYear = (date) => format(Date.parse(date), "yyyy");

  return (
    <div className="">
      <div
        className="card  text-start movie-card"
        style={{ width: "13rem" }}
        onClick={handleMovieClick}
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
          <h5 className="card-title mb-2 mt-2 fs-6 fw-bold">{movie.title}</h5>
          {/* <div className="release-date">{getYear(movie.release_date)}</div> */}
        </div>
      </div>
      {isModalOpen && (
        <ModalContainer>
          <strong>Add {movie.title} to Watchlist?</strong>
          <div className="movie-info">
            <img
              className="modal-image"
              src={environment.IMAGES_URL + "/w185" + movie.poster_path}
              alt="poster path"
              width={200}
            />
            <div className="movie-info-details">
              <span className="movie-info-description">{movie.overview}</span>
              <div className="movie-info-description-buttons">
                <button onClick={handleRentMovie}>Yes</button>
                <button onClick={() => setIsModalOpen(false)}>No</button>
              </div>
            </div>
          </div>
        </ModalContainer>
      )}
    </div>
  );
}

// Movie.propTypes = {
//   movie: PropTypes.object.isRequired,
// };

export default Movie;
