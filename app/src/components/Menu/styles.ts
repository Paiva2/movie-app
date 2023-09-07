import { styled } from "styled-components"

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
  display: flex;
  align-items: center;
  transition: all 0.4s ease-in-out;
  justify-content: end;
`

interface ProfileMenuAttachment {
  $menuScrolled: boolean
  $menuVisibility: boolean
}

export const ProfileMenu = styled.form<ProfileMenuAttachment>`
  display: flex;
  flex-direction: column;
  color: #fff;
  background: #000;
  padding: 3.125rem 1.25rem;
  height: 50%;
  width: 30%;
  border-radius: 3px;
  align-items: center;
  position: absolute;
  transition: all 0.3s ease-in-out;
  top: ${(props) => (props.$menuScrolled ? "70px" : "60px")};
  transform: ${(props) =>
    props.$menuVisibility ? "translateX(0%)" : "translateX(100%)"};
  gap: 1.25rem;
  word-break: break-all;
`

export const ProfilePictureWrapper = styled.div`
  border-radius: 100%;
  overflow: hidden;
  width: 9.375rem;
  height: 9.375rem;
  position: relative;

  label {
    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }

    input {
      display: none;
    }
  }
`

export const ProfilePictureCircle = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  inset: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`

export const ProfileUserName = styled.div`
  font-size: 1.25rem;
  text-align: center;

  h1 {
    margin: 0.3125rem;
  }

  p {
    font-size: 1rem;
  }
`

export const ProfileMenuNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 1.875rem;
  text-align: center;
  width: 100%;

  button {
    cursor: pointer;
  }
`

export const SaveChangesButton = styled.button`
  all: unset;
  background-color: #7c5dfa;
  padding: 0.75rem 0px;
  width: 100%;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #5b38e9;
  }
`

export const LogoutButton = styled.button`
  all: unset;
  padding: 0.75rem 0px;
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }
`

export const CloseButton = styled.button`
  all: unset;
  position: absolute;
  top: 10px;
  right: 20px;
  padding: 0.9375rem;
  cursor: pointer;
`
