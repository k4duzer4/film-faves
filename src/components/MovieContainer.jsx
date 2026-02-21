/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { BsStarFill } from "react-icons/bs";
import {
  StyledMovieContainer,
  PosterLink,
  PosterImage,
  MovieMeta,
  RatingBadge,
  StyledLink,
} from "./MovieContainerStyles";

const imgUrl = "https://image.tmdb.org/t/p/w500/";

const MovieContainer = ({ movie, showLink = true, variant = "default" }) => {
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "-";
  const year = movie.release_date ? movie.release_date.slice(0, 4) : "";

  return (
    <StyledMovieContainer $variant={variant}>
      <PosterLink to={`/movie/${movie.id}`} aria-label={`Abrir ${movie.title}`}>
        <PosterImage
          src={imgUrl + movie.poster_path}
          alt={movie.title}
          loading="lazy"
        />
      </PosterLink>
      <MovieMeta>
        <div>
          <h3>{movie.title}</h3>
          {year && <span>{year}</span>}
        </div>
        <RatingBadge>
          <BsStarFill />
          {rating}
        </RatingBadge>
      </MovieMeta>
      {showLink && (
        <StyledLink to={`/movie/${movie.id}`}>Detalhes</StyledLink>
      )}
    </StyledMovieContainer>
  );
};

export default MovieContainer;
