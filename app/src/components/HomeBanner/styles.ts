import { styled } from "styled-components"

export const BannerContainer = styled.div`
  width: 100%;
  max-height: 37.5rem;
  position: relative;
`
export const Banner = styled.img`
  width: 100%;
  height: 100%;
  max-height: 37.5rem;
  object-fit: cover;
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
`

export const BannerTitle = styled.div`
  color: #fff;
  padding-left: 3.125rem;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;

  span {
    font-size: 3.75rem;
    line-height: 3.125rem;
    font-weight: 900;
  }
`

export const BannerButtonsContainer = styled.div`
  align-self: start;
  display: flex;
  align-items: center;
  gap: 0.625rem;
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
