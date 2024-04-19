import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap"; 
import axios from "../../axiosConfig";
import MovieContainer from "../components/MovieContainer";
import { StyledContainer, StyledHeading, StyledMoviesContainer } from "./HomePageStyles";

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
    <StyledContainer>
      <StyledHeading>Filmes Populares</StyledHeading>
      <StyledMoviesContainer>
        <Container fluid> 
          <Row>
            {recomendMovies.map((movie) => (
              <Col key={movie.id} xs={12} sm={6} md={4} lg={3}>
                <MovieContainer movie={movie} />
              </Col>
            ))}
          </Row>
        </Container>
      </StyledMoviesContainer>
    </StyledContainer>
  );
}

export default HomePage;
