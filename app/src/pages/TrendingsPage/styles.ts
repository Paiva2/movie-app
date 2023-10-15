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

export const PageHeader = styled.ul`
  display: flex;
  align-items: center;
  gap: 2.5rem;
  margin: 0;

  span {
    position: relative;
  }

  @media (max-width: 768px) {
    justify-content: space-between;
    position: relative;

    span {
      position: initial;
    }
  }
`
