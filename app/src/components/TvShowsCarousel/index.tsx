import { useState, useContext } from "react"
import {
  Banner,
  BannerWrapper,
  BookmarkButton,
  CardOverlay,
  CarouselWrapper,
  TvShowCard,
} from "./styles"
import CarouselComponent from "../CarouselComponent"
import { useQuery } from "react-query"
import { UserContextProvider } from "../../contexts/UserContext"
import { FilmProps } from "../../types"
import { api } from "../../lib/api"
import formatSchema from "../../utils/formatSchema"
import { AppContextProvider } from "../../contexts/AppContext"
import checkIfIsBookmarked from "../../utils/checkIfIsBookmarked"
import BookmarkPinType from "../BookmarkPinType"

const TvShowsCarousel = () => {
  const {
    bookmarkedMovies,
    bookmarkingData,
    handleSetBookmark,
    setSelectedFilmDescriptions,
  } = useContext(UserContextProvider)

  const { openMovieModal, setOpenMovieModal } = useContext(AppContextProvider)

  const [changeBookmark, setChangeBookmark] = useState(false)

  const { data: tvShows, isLoading } = useQuery({
    queryKey: ["getHomeTvShows"],

    queryFn: async () => {
      try {
        const response = await api.get<FilmProps[]>("/tv-shows")

        return response
      } catch (e) {
        console.log("There was an error...")
      }
    },
  })

  if (isLoading || !tvShows || !bookmarkedMovies) return <></>

  const homeTvShowsSchema = formatSchema(tvShows?.data, "tv")

  return (
    <CarouselWrapper className="tv-shows">
      <CarouselComponent>
        {homeTvShowsSchema?.map((film) => {
          if (!film.poster_path) return

          const isBookmarked = checkIfIsBookmarked(
            String(film.id),
            bookmarkedMovies?.bookmarkedFilms,
            "filmId"
          )

          return (
            <Banner key={film.id} className="keen-slider__slide">
              <BannerWrapper>
                <TvShowCard
                  onClick={() => {
                    setSelectedFilmDescriptions(film)
                    setOpenMovieModal(!openMovieModal)
                  }}
                >
                  <img
                    alt={film.name}
                    src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
                  />
                  <CardOverlay className="card-overlay">
                    <div>
                      <p>{film.name}</p>
                      <p>
                        Release:{" "}
                        {new Date(film.first_air_date).toLocaleDateString(
                          "en-US"
                        )}
                      </p>
                    </div>
                    <BookmarkButton
                      onMouseOver={() => setChangeBookmark(true)}
                      onMouseLeave={() => setChangeBookmark(false)}
                      disabled={bookmarkingData}
                      onClick={(e) => {
                        e.stopPropagation()

                        handleSetBookmark(
                          film,
                          "tv",
                          isBookmarked ? "remove" : "insert"
                        )
                      }}
                    >
                      <BookmarkPinType
                        isBookmarked={isBookmarked}
                        changeOnHover={changeBookmark}
                      />
                    </BookmarkButton>
                  </CardOverlay>
                </TvShowCard>
              </BannerWrapper>
            </Banner>
          )
        })}
      </CarouselComponent>
    </CarouselWrapper>
  )
}

export default TvShowsCarousel
