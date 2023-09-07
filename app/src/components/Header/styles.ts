import { styled } from "styled-components"

interface HeaderPosition {
  $absolutePosition: boolean
}

export const HeaderContainer = styled.header<HeaderPosition>`
  width: 100%;
  max-width: 120rem;
  padding-top: 0.625rem;
  padding-bottom: 0.625rem;
  transition: all 0.3s ease-in-out;
  background-color: ${(props) =>
    props.$absolutePosition ? "#000" : "rgba(0, 0, 0, 0.7)"};
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: all 0.2s ease-in-out;
  font-size: ${(props) => (props.$absolutePosition ? "1rem" : ".875rem")};

  .profile-pic {
    transition: all 0.3s ease-in-out;
    width: ${(props) => (props.$absolutePosition ? "2.1875rem" : "1.5625rem")};
    height: ${(props) => (props.$absolutePosition ? "2.1875rem" : "1.5625rem")};
  }
`

interface SearchBarVisibilityProps {
  $searchVisibility: boolean
}

export const HeaderAndSearchWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  align-items: center;
  gap: 40px;
  max-width: 75rem;
`

export const SearchHeaderWrapper = styled.div<SearchBarVisibilityProps>`
  width: 35%;
  display: ${(props) => (props.$searchVisibility ? "initial" : "none")};

  label {
    position: relative;
    display: flex;

    button {
      border: 0;
      background-color: #535252;
      height: 100%;
      position: absolute;
      left: 0px;
      display: grid;
      place-items: center;
      top: 0;
      cursor: pointer;
      border-radius: 5px;
      border-bottom-right-radius: 0;
      border-top-right-radius: 0;
    }

    input {
      padding: 0.75rem 0.625rem 0.75rem 2.5rem;
      transition: all 0.2s ease-in-out;
      border-radius: 5px;
      background-color: #1f1f24;
      border: 0;
      color: #fff;
      width: 100%;
    }
  }
`

export const HeaderWrapper = styled.header`
  padding: 0px 3.125rem;
  width: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
`

export const NavMenu = styled.nav`
  white-space: nowrap;

  ul {
    cursor: pointer;
    gap: 1.875rem;
    display: flex;
    color: #fff;
    text-transform: uppercase;
    font-weight: 600;

    li {
      width: 100%;
    }

    a {
      display: flex;
      width: 100%;
      position: relative;

      &:hover {
        &:after {
          transition: max-width 0.2s ease;
          max-width: 100%;
        }
      }
    }

    a:after {
      content: "" "";
      transition: max-width 0.2s ease;
      max-width: 0px;
      position: absolute;
      background-color: #7c5dfa;
      height: 2px;
      left: 0;
      right: 0;
      bottom: -7px;
    }
  }
`

export const ProfilePicture = styled.button`
  all: unset;
  width: 2.1875rem;
  height: 2.1875rem;
  overflow: hidden;
  border: 2px solid #7c5dfa;
  border-radius: 9999px;
  cursor: pointer;

  img {
    width: 100%;
    border-radius: 9999px;
    height: 100%;
    object-fit: cover;
  }
`
