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

  @media (max-width: 768px) {
    min-width: 100%;
    gap: 1.875rem;
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
  width: 80%;
  gap: 0.625rem;
  text-align: center;
  padding: 1.25rem 1.25rem;
  max-height: 31.25rem;
  overflow: auto;
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
      gap: 0.625rem;

      input {
        width: 1.0625rem;
        height: 1.0625rem;
        accent-color: #5b38e9;
        cursor: pointer;
      }

      span {
        min-width: 6.875rem;
      }

      @media (max-width: 768px) {
        justify-content: center;
        gap: 3.75rem;

        input {
          width: 1.5625rem;
          height: 1.5625rem;
        }
      }
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    box-sizing: border-box;
    gap: 1.5625rem;
  }
`
