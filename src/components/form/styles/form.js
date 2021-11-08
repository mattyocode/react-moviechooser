import styled from "styled-components/macro";

export const Wrapper = styled.div`
  max-width: 780px;
  margin: 0 auto;
`;

export const Base = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 540px;
  width: 100%;
`;

export const Header = styled.header`
  display: flex;
  padding: 0 0.5rem;
`;
export const HeaderIcon = styled.div`
  display: flex;
  font-size: 1.5rem;
  align-items: center;
  justify-content: center;

  @media screen and (min-width: 450px) {
    font-size: 2rem;
  }
`;

export const Title = styled.h2`
  font-size: 1.25rem;
  width: 100%;
  text-align: center;
  padding: 0 1rem;

  & span {
    color: var(--clr-neon);
  }

  @media screen and (min-width: 450px) {
    font-size: 1.75rem;
  }
`;

export const Text = styled.p`
  font-size: 1rem;
`;

export const Error = styled.div`
  background: #d67f3c;
  border-radius: 5px;
  font-size: 0.8rem;
  margin: 0.25rem;
  padding: 0.5rem 0.75rem;
`;

export const Input = styled.input`
  color: #fff;
  height: 50px;
  line-height: 50px;
  padding: 5px 20px;
  margin-bottom: 20px;
`;

export const SubmitBtn = styled.button`
  max-width: 25rem;
  margin: 0 auto;
  width: 8rem;
  height: 3rem;
  border-radius: 5px;
  border-style: hidden;
  background-image: linear-gradient(90deg, #51c7d6, #59d7b3 50%, #e3dc44);
  cursor: pointer;
  text-align: center;
  justify-content: center;
  color: #111;
  font-size: 1rem;
  font-weight: bold;

  @media screen and (max-width: 400px) {
    font-size: 0.8rem;
    width: 7rem;
  }
`;
