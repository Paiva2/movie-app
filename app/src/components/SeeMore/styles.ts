import { styled } from "styled-components"

export const SeeMoreButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  button {
    color: #fff;
    background-color: #7c5dfa;
    border-radius: 5px;
    padding: 12px 40px;
    font-size: 1rem;
    font-weight: 600;
    border: 0;
    cursor: pointer;
    line-height: 1rem;
    transition: all 0.2s ease-in-out;

    &:hover {
      background-color: #5434d8;
    }
  }
`
