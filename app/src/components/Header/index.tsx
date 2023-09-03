import { useEffect, useState, useContext, FormEvent, ChangeEvent } from "react"
import {
  HeaderAndSearchWrapper,
  HeaderContainer,
  HeaderWrapper,
  NavMenu,
  ProfileMenu,
  ProfileMenuOverlay,
  ProfilePicture,
  SearchHeaderWrapper,
} from "./styles"
import { UserContextProvider } from "../../contexts/UserContext"
import Cookies from "js-cookie"
import { AuthContextProvider } from "../../contexts/AuthContext"
import { MagnifyingGlass } from "@phosphor-icons/react"
import { api } from "../../lib/api"
import { Toast } from "../../utils/toast"

const Header = () => {
  const [headerPosition, setHeaderPosition] = useState(true)
  const [openMenuProfile, setOpenMenuProfile] = useState(false)
  const { userProfile } = useContext(UserContextProvider)
  const { userAuthenticated } = useContext(AuthContextProvider)

  const [imageProfile, setImage] = useState<Blob>()
  const [showImageProfile, setShowImageProfile] = useState<Blob>()

  function handleChangeImageProfile(e: ChangeEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement
    const files = target.files

    if (files) {
      setImage(files[0])
      setShowImageProfile(files[0])
    }
  }

  async function handleSubmitChanges(e: FormEvent) {
    e.preventDefault()

    const formData = new FormData()

    if (imageProfile) {
      formData.append("files", imageProfile)
    }

    try {
      const uploadResponse = await api.patch("/user-profile", formData, {
        params: {
          userKey: userAuthenticated.userToken,
        },
      })

      Toast.fire({
        icon: "success",
        title: uploadResponse.data.message,
      })
    } catch (e) {
      console.log("There was an error...")
      console.error(e)
    }
  }

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
      block: "center",
      inline: "center",
    })
  }

  return (
    <HeaderContainer $absolutePosition={headerPosition}>
      <HeaderWrapper>
        <HeaderAndSearchWrapper>
          <NavMenu>
            <ul>
              <li aria-hidden onClick={() => scrollToComponent("")}>
                <a href="/home">Home</a>
              </li>
              <li aria-hidden onClick={() => scrollToComponent(".trendings")}>
                <a href="/bookmarked">Bookmarked</a>
              </li>
              <li aria-hidden onClick={() => scrollToComponent(".movies")}>
                <a>Movies</a>
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
              <MagnifyingGlass size={22} color="#FFF" weight="bold" />
              <input type="text" />
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
        <ProfileMenuOverlay
          onClick={() => setOpenMenuProfile(!openMenuProfile)}
          $menuVisibility={openMenuProfile}
        >
          <ProfileMenu
            $menuScrolled={headerPosition}
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSubmitChanges}
            encType="multipart/form-data"
            $menuVisibility={openMenuProfile}
          >
            <div
              style={{
                borderRadius: "100%",
                overflow: "hidden",
                width: "150px",
                height: "150px",
              }}
            >
              <label>
                <img
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                  }}
                  src={
                    showImageProfile
                      ? URL.createObjectURL(showImageProfile)
                      : userProfile?.image
                  }
                />

                <input
                  style={{
                    display: "none",
                  }}
                  type="file"
                  accept="image/*"
                  onChange={handleChangeImageProfile}
                />
              </label>
            </div>
            <div>
              <button onClick={handleLogout} type="button">
                Logout
              </button>
            </div>

            <button
              style={{
                marginTop: "50px",
                background: "red",
              }}
              type="submit"
            >
              Save changes
            </button>
          </ProfileMenu>
        </ProfileMenuOverlay>
      </HeaderWrapper>
    </HeaderContainer>
  )
}

export default Header
