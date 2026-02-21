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
  background: ${({ scrolled }) =>
    scrolled
      ? "rgba(10, 15, 28, 0.9)"
      : "linear-gradient(120deg, rgba(19, 28, 49, 0.88), rgba(14, 20, 35, 0.7))"};
  color: #f8f9ff;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  border-bottom: ${({ scrolled }) =>
    scrolled ? "1px solid rgba(255, 255, 255, 0.08)" : "none"};
  box-shadow: ${({ scrolled }) =>
    scrolled ? "0 20px 40px rgba(3, 7, 18, 0.35)" : "none"};
  backdrop-filter: blur(16px);
  animation: ${fadeIn} 0.5s ease;

  h2 {
    margin: 0;
    font-size: 1.35rem;
    letter-spacing: 0.02em;
  }

  a {
    text-decoration: none;
    color: #f8f9ff;
    display: flex;
    align-items: center;
    gap: 0.65rem;

    img {
      width: 1.75rem;
      height: 1.75rem;
      transition: transform 0.3s ease;

      &:hover {
        transform: rotate(8deg) scale(1.05);
      }
    }
  }

  form {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 0.4rem 0.5rem;
    border-radius: 999px;
    transition: all 0.3s ease;

    &:focus-within {
      background: rgba(255, 255, 255, 0.12);
      border-color: rgba(255, 255, 255, 0.3);
      box-shadow: 0 12px 30px rgba(3, 7, 18, 0.35);
    }

    @media screen and (min-width: 768px) {
      gap: 0.75rem;
    }

    input[type="text"] {
      padding: 0.55rem 0.9rem;
      border: none;
      border-radius: 999px;
      background: transparent;
      color: #f8f9ff;
      width: 150px;
      transition: width 0.3s ease;

      @media screen and (min-width: 768px) {
        width: 200px;
      }

      &:focus {
        outline: none;
        width: 230px;
      }

      &::placeholder {
        color: rgba(248, 249, 255, 0.6);
      }
    }

    button {
      width: 40px;
      height: 40px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(140deg, #ffb703, #ef476f);
      border: none;
      border-radius: 50%;
      color: #0b1220;
      cursor: pointer;
      transition: transform 0.2s ease;

      &:hover {
        transform: translateY(-1px) scale(1.03);
      }

      @media screen and (min-width: 768px) {
        margin-left: 0;
      }
    }
  }

  @media screen and (max-width: 640px) {
    padding: 0.85rem 1.2rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;

    form {
      width: 100%;
      justify-content: space-between;
    }

    form input[type="text"] {
      width: 100%;
    }
  }
`;