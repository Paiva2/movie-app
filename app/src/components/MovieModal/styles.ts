import { styled } from "styled-components"

interface ModalVisibility {
  $visibility: boolean
}

export const ModalOverlay = styled.div<ModalVisibility>`
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
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

  @media (max-width: 1024px) {
    align-items: center;
  }
`

export const CloseModalMobile = styled.button`
  display: none;

  @media (max-width: 768px) {
    all: unset;
    display: flex;
    position: absolute;
    right: 20px;
    top: 20px;
  }
`

export const ModalContainer = styled.div<ModalVisibility>`
  position: fixed;
  background-color: #141414;
  bottom: 0;
  transform: translate(-50%, 0);
  width: 100%;
  max-width: 120rem;
  height: 18.75rem;
  display: flex;
  justify-content: space-between;
  transition: all 0.3s ease-in-out;
  opacity: ${(props) => (props.$visibility ? "1" : "0")};
  visibility: ${(props) => (props.$visibility ? "visible" : "hidden")};

  transform: ${(props) =>
    props.$visibility ? "translateY(0%)" : "translateY(100%)"};

  @media (max-width: 1024px) {
    position: relative;
    flex-direction: column;
    height: 100%;
    box-sizing: border-box;
    padding: 1.25rem;
    padding-top: 4.375rem;
    gap: 1.875rem;
  }
`

export const ModalFilmDescriptions = styled.div`
  padding: 1.25rem;
  display: flex;
  gap: 3.125rem;
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

  @media (max-width: 768px) {
    padding: 0;
    max-height: 45%;
    gap: 0.9375rem;

    &:first-child > span:first-child {
      width: 50%;
    }

    span {
      img {
        object-fit: cover;
      }
    }
  }
`

export const FilmTexts = styled.span`
  padding-top: 1.875rem;
  max-width: 50%;
  word-break: break-word;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;

  span {
    max-height: 90%;
    overflow: auto;
    padding-right: 1.25rem;
  }

  @media (max-width: 768px) {
    padding: 0;
    max-width: 50%;

    span {
      padding: 5px;
    }

    h1 {
      font-size: 1.375rem;
    }

    p {
      margin-top: 0.9375rem;
      line-height: 1.25rem;
      font-size: 0.875rem;
    }
  }
`

export const BannerButtonsContainer = styled.div`
  display: flex;
  gap: 0.625rem;

  @media (max-width: 768px) {
    justify-content: center;

    a:first-child {
      display: none;
    }
  }
`

interface BannerButtons {
  $bg: string
  $fontColor?: string
  $bgHover: string
}

interface ModalBackgroundProps {
  $bgImage: string | null
}

export const ModalFilmBackground = styled.div<ModalBackgroundProps>`
  background-image: ${(props) => (props.$bgImage ? `url(${props.$bgImage})` : "")};
  width: 55%;
  height: 100%;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: right;

  @media (max-width: 768px) {
    width: 100%;
  }
`

export const BannerButtons = styled.a<BannerButtons>`
  all: unset;
  border-radius: 3.125rem;
  padding: 0.5rem 1.25rem;
  cursor: pointer;
  font-size: 0.75rem;
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
