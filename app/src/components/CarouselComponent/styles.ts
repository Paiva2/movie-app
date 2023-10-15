import { styled } from "styled-components"

export const CarouselContainer = styled.div`
  position: relative;
`

export const ArrowsContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  button {
    color: #fff;
    cursor: pointer;
    background-color: transparent;
    border: 0;
    margin: 0;
    padding: 0;
    transition: all 0.2s ease-in-out;

    &:hover {
      opacity: 0.7;
    }

    &:disabled {
      cursor: default;
      opacity: 0.4;
    }
  }
`

export const LeftButton = styled.button`
  position: absolute;
  left: 25px;

  @media (max-width: 768px) {
    left: 10px;
  }
`

export const RightButton = styled.button`
  position: absolute;
  right: 25px;

  @media (max-width: 768px) {
    right: 10px;
  }
`
