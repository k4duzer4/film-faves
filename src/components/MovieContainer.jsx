/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { BsStarFill } from "react-icons/bs";
import { StyledMovieContainer, StyledLink } from "./MovieContainerStyles";

const imgUrl = "https://image.tmdb.org/t/p/w500/";

const MovieContainer = ({ movie, showLink = true }) => {

  return (
    <StyledMovieContainer>
      <Card style={{ width: '15rem' }}> 
        <Link to={`/movie/${movie.id}`}>
          <Card.Img variant="top" src={imgUrl + movie.poster_path} alt={movie.title} />
        </Link>
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text>
            <BsStarFill />
            {movie.vote_count}
          </Card.Text>
          {showLink && (
            <StyledLink to={`/movie/${movie.id}`}>
              Detalhes
            </StyledLink>
          )}
        </Card.Body>
      </Card>
    </StyledMovieContainer>
  );
};


export default MovieContainer;
