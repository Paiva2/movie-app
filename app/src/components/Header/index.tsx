import { useEffect, useState } from "react"
import {
  HeaderContainer,
  HeaderWrapper,
  NavMenu,
  ProfilePicture,
} from "./styles"

const Header = () => {
  const [headerPosition, setHeaderPosition] = useState(true)

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

  return (
    <HeaderContainer $absolutePosition={headerPosition}>
      <HeaderWrapper>
        <NavMenu>
          <ul>
            <li>
              <a href="#">Home</a>
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

        <ProfilePicture className="profile-pic">
          <img src="https://i.postimg.cc/rw23gmVY/21430510-680977128777457-2422235984997179527-n.jpg" />
        </ProfilePicture>
      </HeaderWrapper>
    </HeaderContainer>
  )
}

export default Header
