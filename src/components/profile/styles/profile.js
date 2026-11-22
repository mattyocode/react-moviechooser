import styled from "styled-components";

export const ProfileWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const Title = styled.h3`
  text-align: center;
  padding: 3px;
  color: var(--clr-neon);
  text-decoration: underline;
`;

// The top padding (plus the title's 3px) matches the 3.5rem between the
// last item and the Log Out button below: 0.5rem item padding + 1.5rem
// here + 1rem actions margin + 0.5rem button margin.
export const DataList = styled.ul`
  list-style-type: none;
  padding: 3.25rem 0 1.5rem;
`;

export const DataItem = styled.li`
  padding: 0.5rem;
  & > * {
    display: inline;
  }
`;

export const Field = styled.p`
  color: var(--clr-neon);
  font-size: 1rem;
`;

export const Value = styled.p`
  color: white;
  font-size: 1rem;
`;

export const Error = styled.div`
  width: 14rem;
  display: flex;
  justify-content: flex-end;
  padding-top: 2px;

  p {
    font-size: 0.8rem;
    color: #d67f3c;
    text-align: left;
  }
`;
