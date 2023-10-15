import { ChangeEvent, FormEvent, useContext, useState } from "react"
import {
  ProfileMenuOverlay,
  ProfileMenu,
  ProfilePictureWrapper,
  ProfilePictureCircle,
  ProfileMenuNav,
  SaveChangesButton,
  LogoutButton,
  ProfileUserName,
  CloseButton,
} from "./styles"
import { api } from "../../lib/api"
import { Toast } from "../../utils/toast"
import Cookies from "js-cookie"
import { AuthContextProvider } from "../../contexts/AuthContext"
import { UserContextProvider } from "../../contexts/UserContext"
import { AppContextProvider } from "../../contexts/AppContext"
import { UserCircle, X } from "@phosphor-icons/react"

const MenuProfile = () => {
  const { userAuthenticated } = useContext(AuthContextProvider)
  const { userProfile, bookmarkedMovies } = useContext(UserContextProvider)

  const {
    showImageProfile,
    headerPosition,
    openMenuProfile,
    setShowImageProfile,
    setOpenMenuProfile,
  } = useContext(AppContextProvider)

  const [imageProfile, setImage] = useState<Blob>()

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

  function handleLogout() {
    if (!userAuthenticated.isUserAuth) {
      throw new Error("User must be authenticated before logout.")
    }

    Cookies.remove("movie-app-auth")

    window.location.replace("/login")
  }

  return (
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
        <CloseButton
          type="button"
          onClick={() => setOpenMenuProfile(!openMenuProfile)}
        >
          <X size={30} weight="bold" color="#fff" />
        </CloseButton>
        <ProfilePictureWrapper>
          <label>
            <img
              src={
                showImageProfile
                  ? URL.createObjectURL(showImageProfile)
                  : userProfile?.image
              }
            />

            <input
              type="file"
              accept="image/*"
              onChange={handleChangeImageProfile}
            />

            <ProfilePictureCircle>
              <UserCircle size={40} weight="regular" color="#d1c9c9" />
            </ProfilePictureCircle>
          </label>
        </ProfilePictureWrapper>
        <ProfileUserName>
          <h1>{userProfile?.username}</h1>

          <p>Total bookmarked: {bookmarkedMovies?.bookmarkedFilms.length}</p>
        </ProfileUserName>

        <ProfileMenuNav>
          <SaveChangesButton type="submit">Save changes</SaveChangesButton>

          <LogoutButton onClick={handleLogout} type="button">
            Logout
          </LogoutButton>
        </ProfileMenuNav>
      </ProfileMenu>
    </ProfileMenuOverlay>
  )
}

export default MenuProfile
