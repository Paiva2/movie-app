import { styled } from "styled-components"

interface ModalVisibility {
  $visibility: boolean
}

export const ModalOverlay = styled.div<ModalVisibility>`
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 3000;
  height: 100%;
  transition: all 0.3s ease-in-out;
  opacity: ${(props) => (props.$visibility ? "1" : "0")};
  visibility: ${(props) => (props.$visibility ? "visible" : "hidden")};
`

export const ModalContainer = styled.div<ModalVisibility>`
  position: fixed;
  background-color: #141414;
  bottom: 0;
  transform: translate(-50%, 0);
  width: 100%;
  max-width: 120rem;
  height: 300px;
  display: flex;
  justify-content: space-between;
  transition: all 0.3s ease-in-out;
  opacity: ${(props) => (props.$visibility ? "1" : "0")};
  visibility: ${(props) => (props.$visibility ? "visible" : "hidden")};

  transform: ${(props) =>
    props.$visibility ? "translateY(0%)" : "translateY(100%)"};
`

export const CloseButton = styled.button`
  position: absolute;
  right: 0;
  background-color: #141414;
  border: 0;
  cursor: pointer;
`

export const ModalFilmDescriptions = styled.div`
  padding: 1.25rem;
  display: flex;
  gap: 50px;
  color: #fff;
  width: 100%;

  span {
    overflow: hidden;

    img {
      border-radius: 8px;
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
`

export const FilmTexts = styled.span`
  padding-top: 1.875rem;
  max-width: 35%;
  word-break: break-word;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;

  span {
    max-height: 90%;
    overflow: auto;
  }
`

interface ModalBackgroundProps {
  $bgImage: string | null
}

export const ModalFilmBackground = styled.div<ModalBackgroundProps>`
  background-image: ${(props) =>
    props.$bgImage ? `url(${props.$bgImage})` : ""};
  width: 55%;
  height: 100%;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: right;
`

export const BannerButtonsContainer = styled.div`
  display: flex;
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
