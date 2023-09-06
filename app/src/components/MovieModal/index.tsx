import { useQuery, useQueryClient } from "react-query"
import { UserContextProvider } from "../../contexts/UserContext"
import { FilmProps } from "../../types"
import VideoPreview from "../VideoPreview"
import {
  BannerButtons,
  BannerButtonsContainer,
  FilmTexts,
  ModalContainer,
  ModalFilmBackground,
  ModalFilmDescriptions,
  ModalOverlay,
} from "./styles"
import { useContext, useState } from "react"
import { api } from "../../lib/api"

const MovieModal = () => {
  const {
    bookmarkedMovies,
    selectedFilmDescriptions,
    setSelectedFilmDescriptions,
    openMovieModal,
    setOpenMovieModal,
    handleSetBookmark,
  } = useContext(UserContextProvider)

  const bookmarkedFilmsIds = bookmarkedMovies?.bookmarkedFilms?.map(
    (films) => films.filmId
  )

  const checkIfIsBookmarked = (id: number) => {
    return bookmarkedFilmsIds?.includes(String(id))
  }
  const queryClient = useQueryClient()

  const [isPreviewLoading, setIsPreviewLoading] = useState(true)

  let { data: bookmarkedUrl } = useQuery({
    queryKey: ["getBookmarkPreview"],

    queryFn: async () => {
      setIsPreviewLoading(true)

      try {
        const response = await api.post("/bookmarked-preview", {
          data: {
            bookmarkedInfo: {
              id: selectedFilmDescriptions.id,
              type: selectedFilmDescriptions.media_type,
            },
          },
        })

        return response.data.bookmarkedPreview
      } catch (e) {
        console.log("There was an error...")
      } finally {
        setIsPreviewLoading(false)
      }
    },

    enabled:
      !!selectedFilmDescriptions.id && !!selectedFilmDescriptions.media_type,
  })

  if (!openMovieModal) {
    bookmarkedUrl = ""
  }

  return (
    <ModalOverlay
      $visibility={openMovieModal}
      onClick={() => {
        setOpenMovieModal(false)

        setSelectedFilmDescriptions({} as FilmProps)

        queryClient.invalidateQueries("getBookmarkPreview")
      }}
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
                target="__blank"
                href={`https://www.youtube.com/watch?v=${bookmarkedUrl}`}
              >
                Watch now
              </BannerButtons>
              {checkIfIsBookmarked(selectedFilmDescriptions.id) ? (
                <BannerButtons
                  key="remove"
                  $bgHover="#c22e2e"
                  $bg="#c56363"
                  type="button"
                  onClick={() => {
                    handleSetBookmark(
                      selectedFilmDescriptions,
                      selectedFilmDescriptions.media_type!,
                      "remove"
                    )
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
                    handleSetBookmark(
                      selectedFilmDescriptions,
                      selectedFilmDescriptions.media_type!,
                      "insert"
                    )
                  }}
                >
                  Add to list
                </BannerButtons>
              )}
            </BannerButtonsContainer>
          </FilmTexts>
        </ModalFilmDescriptions>

        {!isPreviewLoading && bookmarkedUrl ? (
          <VideoPreview bookmarkedUrl={bookmarkedUrl} />
        ) : (
          <ModalFilmBackground
            $bgImage={`https://image.tmdb.org/t/p/w500${selectedFilmDescriptions?.backdrop_path}`}
          />
        )}
      </ModalContainer>
    </ModalOverlay>
  )
}

export default MovieModal
