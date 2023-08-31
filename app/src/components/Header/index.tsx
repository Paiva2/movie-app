import { useEffect, useState, useContext } from "react"
import {
  HeaderContainer,
  HeaderWrapper,
  NavMenu,
  ProfileMenu,
  ProfilePicture,
  SearchHeaderWrapper,
} from "./styles"
import { UserContextProvider } from "../../contexts/UserContext"
import Cookies from "js-cookie"
import { AuthContextProvider } from "../../contexts/AuthContext"
import { MagnifyingGlass } from "@phosphor-icons/react"

const Header = () => {
  const [headerPosition, setHeaderPosition] = useState(true)
  const [openMenuProfile, setOpenMenuProfile] = useState(false)
  const { userProfile } = useContext(UserContextProvider)
  const { userAuthenticated } = useContext(AuthContextProvider)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        return setHeaderPosition(false)
      } else {
        return setHeaderPosition(true)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  function handleLogout() {
    if (!userAuthenticated.isUserAuth) {
      throw new Error("User must be authenticated before logout.")
    }

    Cookies.remove("movie-app-auth")

    window.location.replace("/login")
  }

  function scrollToComponent(elementIdentification: string) {
    const element = document.querySelector(elementIdentification)

    element?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    })
  }

  return (
    <HeaderContainer $absolutePosition={headerPosition}>
      <HeaderWrapper>
        <NavMenu>
          <ul>
            <li aria-hidden onClick={() => scrollToComponent("")}>
              <a href="/home">Home</a>
            </li>
            <li aria-hidden onClick={() => scrollToComponent(".movies")}>
              <a href="#">Movies</a>
            </li>
            <li aria-hidden onClick={() => scrollToComponent("")}>
              <a href="#">Series</a>
            </li>
            <li aria-hidden onClick={() => scrollToComponent(".trendings")}>
              <a href="#">Trending</a>
            </li>
          </ul>
        </NavMenu>

        <SearchHeaderWrapper $searchVisibility={headerPosition}>
          <label>
            <MagnifyingGlass size={22} color="#FFF" weight="bold" />
            <input type="text" />
          </label>
        </SearchHeaderWrapper>

        <ProfilePicture
          onClick={() => setOpenMenuProfile(!openMenuProfile)}
          type="button"
          className="profile-pic"
        >
          <img src={userProfile?.image} />
        </ProfilePicture>
        <ProfileMenu $menuVisibility={openMenuProfile}>
          <li>
            <button onClick={handleLogout} type="button">
              Logout
            </button>
          </li>
        </ProfileMenu>
      </HeaderWrapper>
    </HeaderContainer>
  )
}

export default Header
