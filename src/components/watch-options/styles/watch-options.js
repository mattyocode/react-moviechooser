import styled from "styled-components";

export const Wrapper = styled.section`
  /* Shares a row with the poster, so it must be allowed to shrink. */
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  padding: var(--space-2) var(--space-2) 0;
`;

export const PickerLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: var(--space-2);
  font-size: var(--fs-sm);
  color: var(--clr-text-muted);

  & select {
    font: inherit;
    color: var(--clr-text);
    background: var(--clr-field);
    border: 1px solid var(--clr-border);
    border-radius: var(--radius-sm);
    padding: var(--space-1) var(--space-2);
    min-width: 0;
    max-width: 14rem;
  }

  & option {
    color: var(--clr-text);
    background: var(--clr-surface-solid);
  }
`;

export const ProviderList = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-3);
`;

export const Provider = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-1);
  width: 4.5rem;
  font-size: var(--fs-2xs);
  text-align: center;
  color: var(--clr-text-muted);
  overflow-wrap: anywhere;

  & img {
    width: 3rem;
    height: 3rem;
    object-fit: contain;
    border-radius: var(--radius-sm);
  }
`;

export const Message = styled.p`
  text-align: center;
  color: var(--clr-text-muted);
  font-size: var(--fs-base);
`;

export const Cta = styled.a`
  align-self: center;
  display: inline-block;
  padding: var(--space-2) var(--space-5);
  border-radius: var(--radius-pill);
  background: var(--clr-neon);
  color: var(--clr-on-neon);
  font-weight: 600;
  text-decoration: none;
  text-align: center;

  &:hover,
  &:focus-visible {
    text-decoration: underline;
  }
`;

export const Retry = styled.button`
  align-self: center;
  font: inherit;
  color: var(--clr-text);
  background: transparent;
  border: 1px solid var(--clr-border);
  border-radius: var(--radius-pill);
  padding: var(--space-1) var(--space-4);
  cursor: pointer;
`;

export const Credit = styled.p`
  text-align: center;
  font-size: var(--fs-2xs);
  color: var(--clr-text-dim);

  & a {
    color: inherit;
  }
`;
