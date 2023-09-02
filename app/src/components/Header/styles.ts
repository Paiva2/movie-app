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
  width: 90%;
  align-items: center;
  gap: 40px;
  max-width: 70rem;
`

export const SearchHeaderWrapper = styled.div<SearchBarVisibilityProps>`
  width: 35%;

  label {
    position: relative;
    display: flex;

    svg {
      position: absolute;
      left: 10px;
      top: 10px;
    }

    input {
      padding: 0.75rem 0.625rem 0.75rem 2.5rem;
      transition: all 0.2s ease-in-out;
      border-radius: 5px;
      background-color: ${(props) =>
        props.$searchVisibility ? "#1f1f24" : "transparent"};
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
    object-fit: contain;
  }
`

interface OverlayVisibilitySchema {
  $menuVisibility: boolean
}

export const ProfileMenuOverlay = styled.div<OverlayVisibilitySchema>`
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: ${(props) => (props.$menuVisibility ? "1" : "0")};
  visibility: ${(props) => (props.$menuVisibility ? "visible" : "hidden")};
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: end;
`

export const ProfileMenu = styled.ul`
  display: flex;
  flex-direction: column;
  color: #fff;
  background: #000;
  padding: 1.25rem;
  height: 100%;
  width: 35%;
  margin: 0;

  li {
    cursor: pointer;
    font-size: 0.875rem;

    button {
      all: unset;
    }

    &:hover {
      text-decoration: underline;
    }
  }
`
