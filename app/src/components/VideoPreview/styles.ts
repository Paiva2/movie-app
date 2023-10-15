import { styled } from "styled-components"

export const VideoWrapper = styled.div`
  position: relative;
  width: 40%;

  .react-player {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    max-height: 23.4375rem;
  }
`
