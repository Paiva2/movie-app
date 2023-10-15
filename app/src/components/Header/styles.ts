import { styled } from "styled-components"

interface HeaderProps {
  $absolutePosition: boolean
  $hideHeader: boolean
}

export const HeaderContainer = styled.header<HeaderProps>`
  display: ${(props) => (props.$hideHeader ? "none" : "initial")};
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

  @media (min-width: 940px) {
    font-size: ${(props) => (props.$absolutePosition ? "1rem" : ".875rem")};

    .profile-pic {
      transition: all 0.3s ease-in-out;
      width: ${(props) => (props.$absolutePosition ? "2.1875rem" : "1.5625rem")};
      height: ${(props) => (props.$absolutePosition ? "2.1875rem" : "1.5625rem")};
    }
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
  gap: 2.5rem;
  max-width: 75rem;
`

export const HamburguerMenuTrigger = styled.button`
  background-color: transparent;
  border: 0;
  padding: 0;
  padding-top: 0.3125rem;

  @media (min-width: 1040px) {
    display: none;
  }
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
      padding: 0.75rem 0.625rem 0.75rem 2.8125rem;
      transition: all 0.2s ease-in-out;
      border-radius: 5px;
      background-color: #1f1f24;
      border: 0;
      color: #fff;
      width: 100%;
      font-size: 1rem;
    }
  }

  @media (max-width: 1040px) {
    width: 100%;
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
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 0px 1.125rem;
  }
`

interface NavMenuMobileVisibility {
  $visible: boolean
}

export const MobileMenuOverlay = styled.div<NavMenuMobileVisibility>`
  @media (max-width: 1040px) {
    position: fixed;
    display: flex;
    align-items: center;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    visibility: ${(props) => (props.$visible ? "visible" : "hidden")};
    opacity: ${(props) => (props.$visible ? "1" : "0")};
    transition: all 0.3s ease-in-out;
  }
`

export const CloseMobileMenu = styled.button`
  display: none;

  @media (max-width: 1040px) {
    all: unset;
    display: flex;
    width: 95%;
    justify-content: flex-end;
  }
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
    transition: all 0.3s ease-in-out;

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

    @media (max-width: 1040px) {
      position: relative;
      display: flex;
      flex-direction: column;
      background-color: #1f1f24;
      left: 0;
      right: 0;
      top: 0;
      width: 100%;
      margin: 0;
      height: 100vh;
      padding-top: 2.5rem;

      li {
        a {
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;

          &:after {
            content: "" "";
            max-width: 100%;
          }
        }
      }
    }
  }

  @media (max-width: 1040px) {
    width: 60%;
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
