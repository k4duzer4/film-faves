import styled from "styled-components";

export const StyledContainer = styled.div`
  margin: 2rem auto; 
  max-width: 90%; 
  padding: 0.5rem;
`;

export const StyledHeading = styled.h2`
  margin-top: 5rem;
  font-size: 2rem;
  text-align: center;

  @media screen and (max-width: 768px) {
    font-size: 1.5rem; 
  }
`;

export const StyledMoviesContainer = styled.div`
  padding: 1rem;
  margin: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  @media screen and (max-width: 768px) {
    justify-content: center; 
  }
`;
