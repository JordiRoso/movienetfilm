import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { environment } from "../../_environmets/environment";
import { format } from "date-fns";
import "./Movie.scss";

function Movie({ movie }) {
   const navigate = useNavigate();

   // handlers
   const getMovieDetails = (movie) => {
      navigate(`/movies/${movie.id}`);
   };

   const getYear = (date) => format(Date.parse(date), "yyyy");

   return (
      <div className="">
         <div
            className="card  text-start movie-card"
            style={{ width: "13rem" }}
            onClick={() => getMovieDetails(movie)}
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
            </div>
         </div>
      </div>
   );
}

Movie.propTypes = {
   movie: PropTypes.object.isRequired,
};

export default Movie;
