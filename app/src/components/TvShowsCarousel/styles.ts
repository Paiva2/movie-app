import { styled } from "styled-components"

export const Banner = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding-top: 0.625rem;
`

export const BannerWrapper = styled.div`
  display: flex;
  gap: 0.625rem;
  height: 100%;
`

export const TvShowCard = styled.div`
  width: 100%;
  border-radius: 8px;
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
`

export const CarouselWrapper = styled.div`
  padding: 0px 3.125rem 0px 3.125rem;
  position: relative;

  .arrowLeft,
  .arrowRight {
    top: 45%;
  }

  @media (max-width: 768px) {
    padding: 0;
    padding-left: 0.3125rem;
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
    gap: 0.625rem;

    p:first-child,
    p:nth-child(2) {
      font-size: 1.375rem;

      font-size: 0.8125rem;
    }
  }

  &:hover {
    opacity: 1;
  }

  @media (max-width: 768px) {
    opacity: 1;

    div {
      padding-left: 0.625rem;
      padding-bottom: 0.625rem;
      padding-right: 0.625rem;

      p:first-child {
        font-size: 0.8125rem;
      }
    }
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
