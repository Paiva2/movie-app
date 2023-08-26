import { styled } from "styled-components"

export const HomeMiddleSectionWrapper = styled.section`
  width: 100%;
  height: 100%;
  background: #0f0e0e;
  box-shadow: 17px -104px 270px -62px #000000;
  position: relative;
  z-index: 100;
  display: flex;
  flex-direction: column;
  padding-bottom: 3rem;
`

export const RecentlyAddedText = styled.div`
  color: #fff;
  font-size: 1rem;
  padding-left: 50px;
  padding-right: 50px;
  padding-top: 20px;
  text-transform: uppercase;
`

export const BannersContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding-top: 10px;
`

export const BannerWrapper = styled.div`
  display: flex;
  gap: 0.625rem;
`

export const RecentlyAddedCard = styled.div`
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
    padding-left: 20px;
    padding-bottom: 20px;
    align-self: end;

    p:first-child {
      font-weight: bold;
      font-size: 1.375rem;
      margin-bottom: 0.1875rem;
    }
  }

  &:hover {
    opacity: 1;
  }
`
