import { styled } from "styled-components"

export const EmptySearchContainer = styled.div`
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

export const EmptySearchTexts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3125rem;
  align-items: center;

  a {
    font-weight: 500;
    cursor: pointer;
  }

  a:hover {
    text-decoration: underline;
  }
`
