import { useState, useEffect } from "react";
import axios from "../../axiosConfig";
import MovieContainer from "../components/MovieContainer";
import {
  PageContainer,
  PageHeader,
  PageTitle,
  PageSubtitle,
  MoviesGrid,
  EmptyState,
} from "./HomePageStyles";

const HomePage = () => {
  const [recomendMovies, setRecomendMovies] = useState([]);

  useEffect(() => {
    const fetchRecomendMovies = async () => {
      try {
        const response = await axios.get('movie/popular');
        setRecomendMovies(response.data.results);
      } catch (error) {
        console.error('Erro ao buscar filmes populares:', error);
      }
    };

    fetchRecomendMovies();
  }, []);

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>Filmes Populares</PageTitle>
        <PageSubtitle>
          Uma selecao fresca dos titulos mais assistidos agora.
        </PageSubtitle>
      </PageHeader>
      {recomendMovies.length === 0 ? (
        <EmptyState>Carregando os filmes mais quentes do momento.</EmptyState>
      ) : (
        <MoviesGrid>
          {recomendMovies.map((movie) => (
            <MovieContainer key={movie.id} movie={movie} />
          ))}
        </MoviesGrid>
      )}
    </PageContainer>
  );
}

export default HomePage;
