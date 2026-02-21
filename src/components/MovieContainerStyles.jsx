import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledMovieContainer = styled.article`
  padding: 1rem;
  border-radius: var(--radius-lg);
  border: var(--border-subtle);
  background: linear-gradient(180deg, rgba(19, 28, 49, 0.95), rgba(12, 18, 32, 0.9));
  box-shadow: var(--shadow-card);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  ${({ $variant }) =>
    $variant === "detail" &&
    "max-width: 320px; width: 100%;"}

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 26px 60px rgba(6, 13, 28, 0.5);
  }
`;

export const PosterLink = styled(Link)`
  border-radius: var(--radius-md);
  overflow: hidden;
  display: block;
`;

export const PosterImage = styled.img`
  width: 100%;
  aspect-ratio: 2 / 3;
  object-fit: cover;
  transition: transform 0.4s ease;

  ${PosterLink}:hover & {
    transform: scale(1.04);
  }
`;

export const MovieMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.75rem;

  h3 {
    font-size: 1.05rem;
    color: var(--color-text);
    margin-bottom: 0.35rem;
  }

  span {
    font-size: 0.85rem;
    color: var(--color-muted);
  }
`;

export const RatingBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.6rem;
  border-radius: 999px;
  background: rgba(255, 183, 3, 0.2);
  color: var(--color-accent);
  font-size: 0.85rem;
  font-weight: 600;

  svg {
    color: var(--color-accent);
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: var(--color-text);
  font-weight: 600;
  font-size: 0.95rem;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 0.85rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(239, 71, 111, 0.2);
    border-color: rgba(239, 71, 111, 0.5);
  }
`;
