import { styled } from "styled-components"

export const BannerContainer = styled.div`
  width: 100%;
  max-height: 28.125rem;
  position: relative;

  @media (max-width: 768px) {
    height: 18.75rem;
  }
`
export const Banner = styled.img`
  width: 100%;
  height: 100%;
  max-height: 28.125rem;
  object-fit: cover;

  @media (max-width: 768px) {
    height: 18.75rem;
  }
`

export const BannerOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  display: flex;
  align-items: center;
  -webkit-box-shadow: inset 0px -200px 270px -4px rgba(0, 0, 0, 0.85);
  -moz-box-shadow: inset 0px -200px 270px -4px rgba(0, 0, 0, 0.85);
  box-shadow: inset 0px -200px 270px -4px rgba(0, 0, 0, 0.85);

  @media (max-width: 768px) {
    box-shadow: inset 10px -17px 242px -34px rgba(0, 0, 0, 0.85);
    -webkit-box-shadow: inset 10px -17px 242px -34px rgba(0, 0, 0, 0.85);
    -moz-box-shadow: inset 10px -17px 242px -34px rgba(0, 0, 0, 0.85);
  }
`

export const BannerTitle = styled.div`
  color: #fff;
  padding-left: 3.125rem;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;

  span {
    font-size: 3.125rem;
    line-height: 3.125rem;
    font-weight: 900;
  }

  @media (max-width: 1024px) {
    span {
      font-size: 1.875rem;
    }
  }

  @media (max-width: 768px) {
    padding: 0px 1.125rem;
    width: 50%;

    span {
      font-size: 1.25rem;
      line-height: 2.125rem;
    }
  }
`

export const BannerButtonsContainer = styled.div`
  align-self: start;
  display: flex;
  align-items: center;
  gap: 0.625rem;

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 1.25rem;
  }
`

interface BannerButtons {
  $bg: string
  $fontColor?: string
  $bgHover: string
}

export const BannerButtons = styled.button<BannerButtons>`
  border: 0;
  border-radius: 3.125rem;
  padding: 0.5rem 1.25rem;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background-color: ${(props) => (props.$bg ? props.$bg : "transparent")};
  color: ${(props) => (props.$fontColor ? props.$fontColor : "#000")};
  transition: all 0.2s ease-in-out;
  line-height: 0.9375rem;

  &:hover {
    background-color: ${(props) => (props.$bgHover ? props.$bgHover : "none")};
  }
`
