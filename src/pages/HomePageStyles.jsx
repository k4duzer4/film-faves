import styled from "styled-components";

export const PageContainer = styled.section`
  margin: 0 auto;
  max-width: 1200px;
  padding: 2.5rem 1.5rem 0;
`;

export const PageHeader = styled.header`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 2rem;
`;

export const PageTitle = styled.h2`
  font-size: clamp(1.8rem, 3vw, 2.6rem);
  color: var(--color-text);
`;

export const PageSubtitle = styled.p`
  max-width: 520px;
`;

export const MoviesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.8rem;
`;

export const EmptyState = styled.div`
  padding: 2rem;
  border-radius: var(--radius-lg);
  border: var(--border-subtle);
  background: rgba(19, 28, 49, 0.7);
  text-align: center;
  box-shadow: var(--shadow-soft);
`;
