import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledMovieContainer = styled.div`
  border-radius: 1rem;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  padding: 0.5rem;
  transition: transform 0.3s ease;
  width: calc(25% - 2rem); /* Ajuste de tamanho para 4 filmes por linha */
  margin: 1rem;

  @media screen and (max-width: 768px) {
    width: calc(50% - 2rem); /* Em telas menores, 2 filmes por linha */
  }

  @media screen and (max-width: 480px) {
    width: calc(100% - 2rem); /* Em telas ainda menores, 1 filme por linha */
  }

  &:hover {
    transform: translateY(-10px);
  }

  img {
    width: 100%;
    margin-bottom: 1rem;
  }

  h2 {
    font-size: 1rem;
    margin-bottom: 1rem;
  }

  p {
    display: flex;
    align-items: center;
    font-size: 0.75rem;
    color: #011627;
    margin-bottom: 1em;

    svg {
      color: #011627;
      margin-right: 0.25rem;
    }
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: #d11d4d;
  font-weight: bold;

  &:hover {
    color: #011627;
  }
`;
