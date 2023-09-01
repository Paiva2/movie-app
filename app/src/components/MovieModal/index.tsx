import { UserContextProvider } from "../../contexts/UserContext"
import {
  BannerButtons,
  BannerButtonsContainer,
  FilmTexts,
  ModalContainer,
  ModalFilmBackground,
  ModalFilmDescriptions,
  ModalOverlay,
} from "./styles"
import { useContext } from "react"

const MovieModal = () => {
  const {
    bookmarkedMovies,
    selectedFilmDescriptions,
    openMovieModal,
    setOpenMovieModal,
    handleSetBookmark,
  } = useContext(UserContextProvider)

  const bookmarkedFilmsIds = bookmarkedMovies?.bookmarkedFilms?.map(
    (films) => films.filmId
  )

  const functionCheckIfIsBookmarked = (id: number) => {
    return bookmarkedFilmsIds?.includes(String(id))
  }

  return (
    <ModalOverlay
      $visibility={openMovieModal}
      onClick={() => setOpenMovieModal(false)}
    >
      <ModalContainer
        onClick={(e) => e.stopPropagation()}
        $visibility={openMovieModal}
      >
        <ModalFilmDescriptions>
          <span>
            <img
              src={`https://image.tmdb.org/t/p/w500${selectedFilmDescriptions?.poster_path}`}
            />
          </span>

          <FilmTexts>
            <span>
              <h1>{selectedFilmDescriptions.name}</h1>
              <p>{selectedFilmDescriptions.overview}</p>
            </span>

            <BannerButtonsContainer>
              <BannerButtons
                $bgHover="#8976d6"
                $fontColor="#fff"
                $bg="#7c5dfa"
                type="button"
              >
                Watch now
              </BannerButtons>
              {functionCheckIfIsBookmarked(selectedFilmDescriptions.id) ? (
                <BannerButtons
                  key="remove"
                  $bgHover="#c22e2e"
                  $bg="#c56363"
                  type="button"
                  onClick={() => {
                    handleSetBookmark(selectedFilmDescriptions, "remove")
                  }}
                >
                  Remove from list
                </BannerButtons>
              ) : (
                <BannerButtons
                  key="add_list"
                  $bgHover="#d1d1d1"
                  $bg="#fff"
                  type="button"
                  onClick={() => {
                    handleSetBookmark(selectedFilmDescriptions, "insert")
                  }}
                >
                  Add to list
                </BannerButtons>
              )}
            </BannerButtonsContainer>
          </FilmTexts>
        </ModalFilmDescriptions>

        <ModalFilmBackground
          $bgImage={`https://image.tmdb.org/t/p/w500${selectedFilmDescriptions?.backdrop_path}`}
        />
      </ModalContainer>
    </ModalOverlay>
  )
}

export default MovieModal
