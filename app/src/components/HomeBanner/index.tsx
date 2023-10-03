import { useContext } from "react"
import {
  Banner,
  BannerButtons,
  BannerButtonsContainer,
  BannerContainer,
  BannerOverlay,
  BannerTitle,
} from "./styles"
import { UserContextProvider } from "../../contexts/UserContext"
import checkIfIsBookmarked from "../../utils/checkIfIsBookmarked"

const HomeBanner = () => {
  const { handleSetBookmark, bookmarkedMovies } =
    useContext(UserContextProvider)

  if (!bookmarkedMovies) return

  function handleBookmarkBannerPromotion(action: "insert" | "remove") {
    const filmToBookmark = {
      backdrop_path: "/rkB4LyZHo1NHXFEDHl9vSD9r1lI.jpg",
      id: 94605,
      name: "Arcane",
      overview:
        "Amid the stark discord of twin cities Piltover and Zaun, two sisters fight on rival sides of a war between magic technologies and clashing convictions.",
      poster_path: "/fqldf2t8ztc9aiwn3k6mlX3tvRT.jpg",
      media_type: "tv",
      first_air_date: "2021-11-06",
      genre_ids: [12],
    }

    const category = "tv"

    handleSetBookmark(filmToBookmark, category, action)
  }

  if (!bookmarkedMovies) return <></>

  const isDataFromBannerBookmarked = checkIfIsBookmarked(
    94605,
    bookmarkedMovies.bookmarkedFilms,
    "filmId"
  )

  return (
    <BannerContainer>
      <Banner
        alt="Home Banner"
        src="https://images7.alphacoders.com/118/1188302.jpg"
      />

      <BannerOverlay>
        <BannerTitle>
          <span>
            <p>
              LEAGUE OF LEGENDS
              <br /> ARCANE
            </p>
          </span>

          <BannerButtonsContainer>
            <BannerButtons
              $bgHover="#8976d6"
              $fontColor="#fff"
              $bg="#7c5dfa"
              type="button"
            >
              <a
                target="__blank"
                href="https://www.youtube.com/watch?v=3Svs_hl897c"
              >
                Watch now
              </a>
            </BannerButtons>

            <BannerButtons
              onClick={() =>
                handleBookmarkBannerPromotion(
                  isDataFromBannerBookmarked ? "remove" : "insert"
                )
              }
              $fontColor={isDataFromBannerBookmarked ? "#fff" : "#000"}
              $bgHover={isDataFromBannerBookmarked ? "#c56363" : "#d1d1d1"}
              $bg={isDataFromBannerBookmarked ? "#c22e2e" : "#fff"}
              type="button"
            >
              {isDataFromBannerBookmarked ? "REMOVE FROM LIST" : "ADD TO LIST"}
            </BannerButtons>
          </BannerButtonsContainer>
        </BannerTitle>
      </BannerOverlay>
    </BannerContainer>
  )
}

export default HomeBanner
