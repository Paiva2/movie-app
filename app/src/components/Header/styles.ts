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
    props.$absolutePosition ? "#000" : "transparent"};
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

export const HeaderWrapper = styled.header`
  padding: 0px 1.875rem;
  width: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
`

export const NavMenu = styled.nav`
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

export const ProfilePicture = styled.div`
  width: 2.1875rem;
  height: 2.1875rem;
  overflow: hidden;
  border: 2px solid #7c5dfa;
  border-radius: 9999px;

  img {
    width: 100%;
    border-radius: 9999px;
    height: 100%;
    object-fit: contain;
  }
`
