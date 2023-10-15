import { styled } from "styled-components"

export const ColumnsContainer = styled.div`
  padding: 3.125rem;
  display: flex;
  flex-direction: column;
  gap: 1.5625rem;
  color: #fff;

  @media (max-width: 768px) {
    box-sizing: border-box;
    padding: 1.25rem 1.125rem;
  }
`
