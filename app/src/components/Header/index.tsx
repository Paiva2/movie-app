import { useEffect, useContext } from "react"
import {
  HeaderAndSearchWrapper,
  HeaderContainer,
  HeaderWrapper,
  NavMenu,
  ProfilePicture,
  SearchHeaderWrapper,
} from "./styles"
import { UserContextProvider } from "../../contexts/UserContext"
import { MagnifyingGlass } from "@phosphor-icons/react"
import Menu from "../Menu"
import { AppContextProvider } from "../../contexts/AppContext"

const Header = () => {
  const { userProfile } = useContext(UserContextProvider)
  const {
    showImageProfile,
    headerPosition,
    openMenuProfile,
    searchValues,
    setSearchValues,
    setHeaderPosition,
    setOpenMenuProfile,
  } = useContext(AppContextProvider)

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

  function scrollToComponent(elementIdentification: string) {
    const element = document.querySelector(elementIdentification)

    element?.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    })
  }

  async function getSearchedItems() {
    setSearchValues("")

    window.location.replace(`/search?keyword=${searchValues}`)
  }

  return (
    <HeaderContainer $absolutePosition={headerPosition}>
      <HeaderWrapper>
        <HeaderAndSearchWrapper>
          <NavMenu>
            <ul>
              <li aria-hidden>
                <a href="/home">Home</a>
              </li>
              <li aria-hidden>
                <a href="/bookmarked">Bookmarked</a>
              </li>
              <li aria-hidden>
                <a href="/movies">Movies</a>
              </li>
              <li aria-hidden onClick={() => scrollToComponent(".tv-shows")}>
                <a>Tv Shows</a>
              </li>
              <li aria-hidden onClick={() => scrollToComponent(".trendings")}>
                <a>Trending</a>
              </li>
            </ul>
          </NavMenu>
          <SearchHeaderWrapper $searchVisibility={headerPosition}>
            <label>
              <button onClick={getSearchedItems} type="button">
                <MagnifyingGlass size={22} color="#FFF" weight="bold" />
              </button>
              <input
                value={searchValues}
                onChange={({ target }) => setSearchValues(target.value)}
                type="text"
              />
            </label>
          </SearchHeaderWrapper>
        </HeaderAndSearchWrapper>

        <ProfilePicture
          onClick={() => setOpenMenuProfile(!openMenuProfile)}
          type="button"
          className="profile-pic"
        >
          <img
            src={
              showImageProfile
                ? URL.createObjectURL(showImageProfile)
                : userProfile?.image
            }
          />
        </ProfilePicture>

        <Menu />
      </HeaderWrapper>
    </HeaderContainer>
  )
}

export default Header
