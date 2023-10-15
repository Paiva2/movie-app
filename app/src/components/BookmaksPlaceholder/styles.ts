import { styled } from "styled-components"

export const NoBookmarksContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: #fff;
  align-items: center;
  gap: 1.875rem;
  height: 100%;
  justify-content: center;
  inset: 0;
  position: absolute;
`

export const NoBookmarksTexts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3125rem;
  align-items: center;
  box-sizing: border-box;

  a {
    font-weight: 500;
    cursor: pointer;
  }

  a:hover {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    text-align: center;
    padding: 0.625rem;

    h1 {
      font-size: 24px;
    }

    a {
      text-decoration: underline;
      max-width: 70%;
    }
  }
`
