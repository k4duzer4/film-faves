/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BiMoneyWithdraw, BiSolidWallet, BiSolidHourglass, BiFile, BiSolidData } from "react-icons/bi";
import { Container, Button, Form } from "react-bootstrap";
import MovieContainer from "../components/MovieContainer";
import axios from "../../axiosConfig";
import "./Movie.css";

const moviesUrl = "https://api.themoviedb.org/3/movie/";
const apiKey = "35dff10e3f2d8b07ed926313e0ef06b0";

const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [rating, setRating] = useState(0);
  const [ratingSubmitted, setRatingSubmitted] = useState(false);

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
            <MovieContainer movie={movie} showLink={false} />
            <div className="movie_info">
              <p className="movie_tagline">&quot;{movie.tagline}&quot;</p>
              <div className="movie_info_info">
                <h3>
                  <BiSolidData /> Data de Lançamento
                  <p>{movie.release_date}</p>
                </h3>
              </div>
              <div className="movie_info_info">
                <h3>
                  <BiSolidWallet /> Bilheteria
                  <p>{moneyFormat(movie.budget)}</p>
                </h3>
              </div>
              <div className="movie_info_info">
                <h3>
                  <BiMoneyWithdraw /> Bilheteria
                  <p>{moneyFormat(movie.revenue)}</p>
                </h3>
              </div>
              <div className="movie_info_info">
                <h3>
                  <BiSolidHourglass /> Duração
                  <p>{movie.runtime}</p>
                </h3>
              </div>
              <div className="movie_info_info">
                <h3>
                  <BiFile /> Descrição
                  <p>{movie.overview}</p>
                </h3>
              </div>
            </div>
          </div>
          {!ratingSubmitted && (
            <Container className="rating_form">
              <h3>Enviar Avaliação</h3>
              <Form onSubmit={handleSubmitRating}>
                <Form.Group controlId="rating">
                  <Form.Label>Avaliação</Form.Label>
                  <Form.Control 
                    as="select" 
                    value={rating} 
                    onChange={handleRatingChange}
                  >
                    <option value={0}>Selecione uma avaliação...</option>
                    {[...Array(10)].map((_, index) => (
                      <option key={index} value={index + 1}>{index + 1}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">
                  Enviar Avaliação
                </Button>
              </Form>
            </Container>
          )}
          {ratingSubmitted && (
            <Container className="rating_form">
              <p>Avaliação enviada com sucesso!</p>
            </Container>
          )}
        </>
      )}
    </div>
  );
};

export default Movie;
