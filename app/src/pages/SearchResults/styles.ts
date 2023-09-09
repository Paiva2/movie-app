import { styled } from "styled-components"

export const ColumnsContainer = styled.div`
  padding: 3.125rem;
  display: flex;
  flex-direction: column;
  gap: 1.5625rem;
  color: #fff;
`

export const DataColumn = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12.5rem, 1fr));
  gap: 1.875rem;
`
