import { useQuery, useQueryClient } from "react-query"
import { UserContextProvider } from "../../contexts/UserContext"
import { FilmProps } from "../../types"
import VideoPreview from "../VideoPreview"
import {
  BannerButtons,
  BannerButtonsContainer,
  CloseModalMobile,
  FilmTexts,
  ModalContainer,
  ModalFilmBackground,
  ModalFilmDescriptions,
  ModalOverlay,
} from "./styles"
import { useContext, useEffect, useState } from "react"
import { api } from "../../lib/api"
import { AppContextProvider } from "../../contexts/AppContext"
import { X } from "@phosphor-icons/react"
import { useIsMobile } from "../../hooks/useIsMobile"

const MovieModal = () => {
  const {
    bookmarkedMovies,
    selectedFilmDescriptions,
    setSelectedFilmDescriptions,
    handleSetBookmark,
  } = useContext(UserContextProvider)

  const { openMovieModal, setOpenMovieModal } = useContext(AppContextProvider)
  const isMobile = useIsMobile()

  const bookmarkedFilmsIds = bookmarkedMovies?.bookmarkedFilms?.map(
    (films) => films.filmId
  )

  const checkIfIsBookmarked = (id: number) => {
    return bookmarkedFilmsIds?.includes(String(id))
  }
  const queryClient = useQueryClient()

  const [isPreviewLoading, setIsPreviewLoading] = useState(true)

  let { data: bookmarkedUrl } = useQuery({
    queryKey: ["getDataVideoPreview"],

    queryFn: async () => {
      setIsPreviewLoading(true)

      try {
        const response = await api.post("/data-video-preview", {
          data: {
            requestedDataPreviewInfo: {
              id: selectedFilmDescriptions.id,
              type: selectedFilmDescriptions.media_type,
            },
          },
        })

        return response.data.dataVideoPreview
      } catch (e) {
        console.log("There was an error...")
      } finally {
        setIsPreviewLoading(false)
      }
    },

    enabled: !!selectedFilmDescriptions.id && !!selectedFilmDescriptions.media_type,
  })

  if (!openMovieModal) {
    bookmarkedUrl = ""
  }

  useEffect(() => {
    if (!isMobile) {
      setOpenMovieModal(false)
    }
  }, [isMobile])

  const getBody = document.querySelector("body") as HTMLElement

  if (openMovieModal) {
    getBody.style.overflow = "hidden"
  } else {
    getBody.style.overflow = "initial"
  }

  return (
    <ModalOverlay
      $visibility={openMovieModal}
      onClick={() => {
        setOpenMovieModal(false)

        setSelectedFilmDescriptions({} as FilmProps)

        queryClient.invalidateQueries("getDataVideoPreview")
      }}
    >
      <ModalContainer
        onClick={(e) => e.stopPropagation()}
        $visibility={openMovieModal}
      >
        <CloseModalMobile
          type="button"
          onClick={() => {
            setSelectedFilmDescriptions({} as FilmProps)

            queryClient.invalidateQueries("getDataVideoPreview")

            setOpenMovieModal(!openMovieModal)
          }}
        >
          {" "}
          <X size={40} color="#fff" weight="bold" />
        </CloseModalMobile>
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
              {bookmarkedUrl && (
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
              )}
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
