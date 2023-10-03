import styled from "styled-components"

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
  padding: 1.25rem 1.25rem;
  right: 0;
  left: 0;
  opacity: ${(props) => (props.$visibility ? "1" : "0")};
  visibility: ${(props) => (props.$visibility ? "visible" : "hidden")};
  transition: all 0.3s ease-in-out;
  border-radius: 4px;

  li {
    cursor: pointer;
    width: 100%;

    label {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;

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
