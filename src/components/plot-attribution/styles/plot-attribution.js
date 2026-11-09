import styled from "styled-components";

export const Details = styled.details`
  max-width: 900px;
  margin: var(--space-4) auto 0;
  padding: 0 var(--space-4);
  color: var(--clr-text-dim);
  font-size: 0.85rem;
  text-align: center;

  & summary {
    cursor: pointer;
  }

  & a {
    color: var(--clr-text-muted);
  }
`;

export const Sources = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-1) var(--space-3);
  margin-top: var(--space-2);
  list-style: none;
`;
