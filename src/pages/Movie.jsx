/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  BiMoneyWithdraw,
  BiSolidWallet,
  BiSolidHourglass,
  BiFile,
  BiSolidData,
} from "react-icons/bi";
import MovieContainer from "../components/MovieContainer";
import axios from "../../axiosConfig";
import "./Movie.css";

const moviesUrl = "https://api.themoviedb.org/3/movie/";
const apiKey = "35dff10e3f2d8b07ed926313e0ef06b0";

const uiCopy = {
  "pt-BR": {
    releaseDate: "Data de Lancamento",
    budget: "Orcamento",
    revenue: "Receita",
    runtime: "Duracao",
    description: "Descricao",
    submitRating: "Enviar avaliacao",
    ratingLabel: "Avaliacao",
    ratingPlaceholder: "Selecione uma avaliacao...",
    ratingSuccess: "Avaliacao enviada com sucesso!",
    minutes: "min",
  },
  "en-US": {
    releaseDate: "Release Date",
    budget: "Budget",
    revenue: "Revenue",
    runtime: "Runtime",
    description: "Overview",
    submitRating: "Submit rating",
    ratingLabel: "Rating",
    ratingPlaceholder: "Select a rating...",
    ratingSuccess: "Rating submitted successfully!",
    minutes: "min",
  },
};

const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [rating, setRating] = useState(0);
  const [ratingSubmitted, setRatingSubmitted] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const language = navigator.language in uiCopy ? navigator.language : "pt-BR";
  const labels = uiCopy[language];

  const getMovie = async () => {
    try {
      const movieUrl = `${moviesUrl}${id}?api_key=${apiKey}`;
      const response = await axios.get(movieUrl);
      setMovie(response.data);
    } catch (error) {
      console.error('Erro ao buscar filme:', error);
    }
  };

  const moneyFormat = (number) => {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const dateFormat = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(language).format(date);
  };

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const handleSubmitRating = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/movie/${id}/rating`, {
        value: rating
      });
      console.log('Avaliação enviada com sucesso:', response.data);
      setRatingSubmitted(true);
    } catch (error) {
      console.error('Erro ao enviar avaliação:', error);
    }
  };

  useEffect(() => {
    getMovie();
  }, []);

  return (
    <div className="movie_page">
      {movie && (
        <>
          <div className="movie_container">
            <MovieContainer movie={movie} showLink={false} variant="detail" />
            <div className="movie_info">
              <p className="movie_tagline">&quot;{movie.tagline}&quot;</p>
              <div className="movie_info_info">
                <h3>
                  <BiSolidData /> {labels.releaseDate}
                </h3>
                <p>{dateFormat(movie.release_date)}</p>
              </div>
              <div className="movie_info_info">
                <h3>
                  <BiSolidWallet /> {labels.budget}
                </h3>
                <p>{moneyFormat(movie.budget)}</p>
              </div>
              <div className="movie_info_info">
                <h3>
                  <BiMoneyWithdraw /> {labels.revenue}
                </h3>
                <p>{moneyFormat(movie.revenue)}</p>
              </div>
              <div className="movie_info_info">
                <h3>
                  <BiSolidHourglass /> {labels.runtime}
                </h3>
                <p>
                  {movie.runtime ? `${movie.runtime} ${labels.minutes}` : "-"}
                </p>
              </div>
              <div className="movie_info_info">
                <h3>
                  <BiFile /> {labels.description}
                </h3>
                <p>{movie.overview}</p>
              </div>
            </div>
          </div>
          {!ratingSubmitted && (
            <section className="rating_form">
              <h3>{labels.submitRating}</h3>
              <form onSubmit={handleSubmitRating}>
                <label htmlFor="rating">{labels.ratingLabel}</label>
                <div className="star_rating" role="radiogroup" aria-label={labels.ratingLabel}>
                  {[...Array(10)].map((_, index) => {
                    const value = index + 1;
                    const isActive = value <= (hoverRating || rating);

                    return (
                      <button
                        key={value}
                        type="button"
                        className={isActive ? "star active" : "star"}
                        aria-pressed={rating === value}
                        onClick={() => setRating(value)}
                        onMouseEnter={() => setHoverRating(value)}
                        onMouseLeave={() => setHoverRating(0)}
                      >
                        ★
                      </button>
                    );
                  })}
                </div>
                <input type="hidden" id="rating" value={rating} readOnly />
                <button type="submit" disabled={!rating}>
                  {labels.submitRating}
                </button>
              </form>
            </section>
          )}
          {ratingSubmitted && (
            <section className="rating_form">
              <p>{labels.ratingSuccess}</p>
            </section>
          )}
        </>
      )}
    </div>
  );
};

export default Movie;
