import { motion } from "framer-motion";
import styled from "styled-components/macro";

export const Wrapper = styled.div`
  max-width: 780px;
  margin: 0 auto;
`;

export const Base = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

export const Header = styled.header`
  display: flex;
  padding: 0 0.25rem;
`;

export const HeaderImg = styled.img`
  position: absolute;
  height: 2rem;
  margin: 4px;
  justify-content: flex-start !important;

  @media screen and (min-width: 450px) {
    height: 2.25rem;
  }
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  width: 100%;
  text-align: center;
  padding: 0 1rem;
  color: var(--clr-neon);
  margin: 2rem 0 0.5rem 0;

  & span {
    margin-right: 0.5rem;
  }

  @media screen and (min-width: 450px) {
    margin: 0.5rem 0;
    font-size: 1.75rem;
  }
`;

export const Text = styled.p`
  font-size: 0.8rem;
  /* margin: 0.25rem 0; */
  text-align: center;
`;

export const Link = styled(motion.button)`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  color: #51c7d6;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
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

export const FormError = styled.div`
  width: 14rem;
  display: flex;
  justify-content: center;
  padding-top: 14px;
  margin: 0 auto;

  p {
    font-size: 1rem;
    color: #ce2352;
    text-align: center;
  }
`;

export const FormSuccess = styled.div`
  width: 14rem;
  display: flex;
  justify-content: center;
  padding-top: 14px;
  margin: 0 auto;

  p {
    font-size: 1rem;
    color: #51c7d6;
    text-align: center;
  }
`;

export const Input = styled.input`
  border: 0;
  outline: 0;
  background: transparent;
  border-bottom: 2px solid #51c7d6;
  color: #eee;
  font-weight: bold;
  height: 50px;
  line-height: 50px;
  padding: 15px 20px;
  margin-top: 20px;
  width: 15rem;

  &:last-child {
    margin-bottom: 20px;
  }
`;

export const SubmitBtn = styled(motion.button)`
  max-width: 25rem;
  margin: 20px auto;
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

  &:disabled {
    background: #444;
    color: #aaa;
  }

  @media screen and (max-width: 400px) {
    font-size: 0.8rem;
    width: 7rem;
  }
`;

export const Actions = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem;
`;

export const ActionBtn = styled(motion.button)`
  background: none;
  color: inherit;
  font: inherit;
  cursor: pointer;
  outline: inherit;

  letter-spacing: 0.1rem;
  display: block;
  transition: all 0.3s linear;
  text-decoration: none;
  border-radius: 5px;
  border: 1px solid var(--clr-neon);
  padding: 0.5rem;
  margin: 0.5rem;

  &.active {
    background: var(--clr-neon);
    color: #222;
    /* border: 1px solid rgba(0, 0, 0, 0); */
  }
`;
