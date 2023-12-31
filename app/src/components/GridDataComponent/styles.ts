import styled from "styled-components"

export const Column = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(12.5rem, 1fr));
  gap: 1.875rem;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`

export const Card = styled.div`
  border-radius: 8px;
  max-width: 12.5rem;
  overflow: hidden;
  border: 1px solid #292929;
  position: relative;
  transform: translateY(0%);
  transition: all 0.3s ease-in-out;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:hover {
    transform: translateY(-3%);
  }

  @media (max-width: 768px) {
    max-width: 100%;
  }
`

export const CardOverlay = styled.div`
  position: absolute;
  -webkit-box-shadow: inset 0px -166px 84px -25px rgba(0, 0, 0, 0.94);
  -moz-box-shadow: inset 0px -166px 84px -25px rgba(0, 0, 0, 0.94);
  box-shadow: inset 0px -166px 84px -25px rgba(0, 0, 0, 0.94);
  opacity: 0;
  height: 100%;
  width: 100%;
  top: 0;
  display: flex;
  color: #fff;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  div {
    padding-left: 1.25rem;
    padding-bottom: 1.25rem;
    align-self: end;

    p:first-child {
      font-weight: bold;
      font-size: 1.375rem;
      margin-bottom: 0.1875rem;
    }

    @media (max-width: 768px) {
      box-sizing: border-box;
      padding: 1.25rem;
      text-align: center;
      width: 100%;
    }
  }

  &:hover {
    opacity: 1;
  }

  @media (max-width: 768px) {
    opacity: 1;
  }
`

export const BookmarkButton = styled.button`
  all: unset;
  position: absolute;
  top: 0.625rem;
  right: 0.625rem;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 9999px;
  padding: 0.5rem;
  display: grid;
  place-items: center;
`

export const MovieTypePin = styled.span`
  position: absolute;
  top: 0.625rem;
  left: 0.625rem;
  padding: 0.5rem;
  text-transform: capitalize;
  background-color: red;
  width: fit-content;
  border-radius: 5px;

  p {
    font-size: 0.75rem;
    font-weight: 600;
  }
`
