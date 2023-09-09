import { useEffect, useContext, useState, useLayoutEffect } from "react"
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
import { AuthContextProvider } from "../../contexts/AuthContext"

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
  const { userAuthenticated } = useContext(AuthContextProvider)

  const [hideHeader, setHideHeader] = useState<boolean>(true)

  function checkLocationToHideComponent(pathnames: string[]) {
    return pathnames.some((route) => {
      return window.location.href.includes(route)
    })
  }

  function willHeaderStayHidden() {
    const routes = ["/login", "/register", "/forgot-password"]

    const checkIfPageIsValidToHeaderAppear =
      checkLocationToHideComponent(routes)

    if (checkIfPageIsValidToHeaderAppear) {
      setHideHeader(true)
    } else {
      setHideHeader(false)
    }
  }

  useLayoutEffect(() => {
    willHeaderStayHidden()
  }, [window.location.pathname, userAuthenticated])

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

  async function getSearchedItems() {
    setSearchValues("")

    window.location.replace(`/search?keyword=${searchValues}`)
  }

  if (!userAuthenticated.isUserAuth) return <></>

  return (
    <HeaderContainer
      $hideHeader={hideHeader}
      $absolutePosition={headerPosition}
    >
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
              <li aria-hidden>
                <a href="/tv-show">Tv Shows</a>
              </li>
              <li aria-hidden>
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
