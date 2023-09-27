import { styled } from "styled-components"

export const ColumnsContainer = styled.div`
  padding: 3.125rem;
  display: flex;
  flex-direction: column;
  gap: 1.5625rem;
  color: #fff;
`

export const PageHeader = styled.ul`
  display: flex;
  align-items: center;
  gap: 2.5rem;

  span {
    position: relative;
  }
`

interface FilterListVisibility {
  $visibility: boolean
}

export const FilterTrigger = styled.button<FilterListVisibility>`
  all: unset;
  font-size: 1.25rem;
  color: #fff;
  min-width: 11.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  svg {
    transition: all 0.3s ease-in-out;
    transform: ${(props) =>
      props.$visibility ? "rotate(180deg);" : "rotate(0deg);"};
  }
`

export const FilterList = styled.ul<FilterListVisibility>`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 100%;
  z-index: 10;
  background-color: #252424;
  color: #fff;
  width: 100%;
  gap: 0.625rem;
  text-align: center;
  padding: 0.625rem 0px;
  right: 0;
  left: 0;
  opacity: ${(props) => (props.$visibility ? "1" : "0")};
  visibility: ${(props) => (props.$visibility ? "visible" : "hidden")};
  transition: all 0.3s ease-in-out;

  li {
    cursor: pointer;
    width: 100%;

    label {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1.875rem;

      input {
        width: 17px;
        height: 17px;
        accent-color: #5b38e9;
        cursor: pointer;
      }

      span {
        min-width: 6.875rem;
      }
    }
  }
`
