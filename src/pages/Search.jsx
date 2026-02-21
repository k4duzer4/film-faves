import { useEffect, useState } from "react";
import axios from "../../axiosConfig";
import { useSearchParams } from "react-router-dom";
import MovieContainer from "../components/MovieContainer";
import {
  PageContainer,
  PageHeader,
  PageTitle,
  PageSubtitle,
  MoviesGrid,
  EmptyState,
} from "./HomePageStyles";

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

  const emptyMessage = query
    ? "Nenhum filme encontrado. Tente outro termo."
    : "Digite um termo para iniciar a busca.";

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>Resultados</PageTitle>
        <PageSubtitle>
          {query ? `Encontramos filmes para: ${query}` : "Digite algo para buscar."}
        </PageSubtitle>
      </PageHeader>
      {movies.length === 0 ? (
        <EmptyState>{emptyMessage}</EmptyState>
      ) : (
        <MoviesGrid>
          {movies.map((movie) => (
            <MovieContainer key={movie.id} movie={movie} />
          ))}
        </MoviesGrid>
      )}
    </PageContainer>
  );
};

export default Search;
