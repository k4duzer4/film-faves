import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const NavbarContainer = styled.nav`
  background-color: #ffae00;
  color: #f5edf0;
  padding: 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  box-shadow: ${({ scrolled }) =>
    scrolled ? "0 2px 4px rgba(0, 0, 0, 0.1)" : "none"};
  animation: ${fadeIn} 0.5s ease;

  h2 {
    margin: 0;
    font-size: 1.5rem;
  }

  a {
    text-decoration: none;
    color: #d11d4d;
    display: flex;
    align-items: center;

    img {
      width: 1.5rem;
      height: 1.5rem;
      margin-right: 0.625rem;
      transition: transform 0.3s ease;

      &:hover {
        transform: rotate(10deg);
      }
    }
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    @media screen and (min-width: 768px) {
      flex-direction: row;
      align-items: center;
    }

    input[type="text"] {
      padding: 0.5rem;
      border: none;
      border-radius: 0.25rem;
      margin-bottom: 0.625rem;
      width: 100%;

      @media screen and (min-width: 768px) {
        margin-bottom: 0;
        margin-right: 0.625rem;
        width: auto;
      }

      &:focus {
        width: 200px;
      }
    }

    button {
      padding: 0.5rem 1rem;
      background-color: #d11d4d;
      border: none;
      border-radius: 0.25rem;
      cursor: pointer;
      transition: background-color 0.1s ease;

      &:hover {
        background-color: #F5EDF0;
      }

      @media screen and (min-width: 768px) {
        margin-left: 0.625rem;
      }
    }
  }
`;