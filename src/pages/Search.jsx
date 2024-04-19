import { useEffect, useState } from "react";
import axios from "../../axiosConfig";
import { useSearchParams } from "react-router-dom";
import { StyledContainer, StyledHeading, StyledMoviesContainer } from "./HomePageStyles"; 
import { StyledMovieContainer, StyledLink } from "../components/MovieContainerStyles"; 

const Search = () => {
  const [searchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  
  const query = searchParams.get("q");

  useEffect(() => {
    const fetchSearchedMovies = async () => {
      try {
        const response = await axios.get(`search/movie?query=${query}`);
        setMovies(response.data.results);
      } catch (error) {
        console.error('Erro ao buscar filmes:', error);
      }
    };

    if (query) {
      fetchSearchedMovies();
    } else {
      setMovies([]);
    }
  }, [query]);

  return (
    <StyledContainer>
      <StyledHeading>
        Resultados para: {query}
      </StyledHeading>
      <StyledMoviesContainer>
        {movies.length > 0 &&
          movies.map((movie) => (
            <StyledMovieContainer key={movie.id}>
              <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
              <h2>{movie.title}</h2>
              <p>
                <StyledLink to={`/movie/${movie.id}`}>Detalhes</StyledLink>
              </p>
            </StyledMovieContainer>
          ))}
      </StyledMoviesContainer>
    </StyledContainer>
  );
};

export default Search;
