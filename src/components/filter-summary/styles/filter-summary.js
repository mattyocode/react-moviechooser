import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  max-width: 900px;
  margin: 0 auto;
  padding: 0 var(--space-4);
`;

export const Chips = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-2);
  list-style: none;
`;

export const Chip = styled.li`
  padding: 0.3rem 0.85rem;
  border: 1px solid var(--clr-neon-soft);
  border-radius: var(--radius-pill);
  background: var(--clr-neon-faint);
  color: var(--clr-neon);
  font-size: 0.9rem;
  font-weight: 500;
`;

export const EditButton = styled.button`
  padding: 0.3rem 0.85rem;
  border: 1px solid var(--clr-border);
  border-radius: var(--radius-pill);
  background: transparent;
  color: var(--clr-text);
  font: 500 0.9rem var(--font-body);
  cursor: pointer;
  transition: border-color 0.2s, background-color 0.2s;

  &:hover {
    border-color: var(--clr-neon);
    background-color: var(--clr-neon-faint);
  }
`;
