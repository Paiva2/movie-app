import { useEffect, useState, useContext } from "react"
import {
  HeaderContainer,
  HeaderWrapper,
  NavMenu,
  ProfileMenu,
  ProfilePicture,
} from "./styles"
import { UserContextProvider } from "../../contexts/UserContext"
import Cookies from "js-cookie"
import { AuthContextProvider } from "../../contexts/AuthContext"

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

  return (
    <HeaderContainer $absolutePosition={headerPosition}>
      <HeaderWrapper>
        <NavMenu>
          <ul>
            <li>
              <a href="/home">Home</a>
            </li>
            <li>
              <a href="#">Movies</a>
            </li>
            <li>
              <a href="#">Series</a>
            </li>
            <li>
              <a href="#">Trending</a>
            </li>
          </ul>
        </NavMenu>

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
