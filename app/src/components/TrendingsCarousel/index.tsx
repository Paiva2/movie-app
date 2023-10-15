import { useState, useContext } from "react"
import {
  Banner,
  BannerWrapper,
  BookmarkButton,
  CardOverlay,
  CarouselWrapper,
  MovieTypePin,
  TrendingCard,
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

const TrendingsCarousel = () => {
  const {
    bookmarkedMovies,
    bookmarkingData,
    handleSetBookmark,
    setSelectedFilmDescriptions,
  } = useContext(UserContextProvider)

  const { openMovieModal, setOpenMovieModal } = useContext(AppContextProvider)

  const [changeBookmark, setChangeBookmark] = useState(false)

  const { data: trendings, isLoading } = useQuery({
    queryKey: ["getHomeTrendings"],

    queryFn: async () => {
      try {
        const response = await api.post<{ results: FilmProps[] }>("/trending-movies")

        return response.data.results
      } catch (e) {
        console.log("There was an error...")
      }
    },
  })

  if (isLoading || !trendings || !bookmarkedMovies) return <></>

  const trendingsSchema = formatSchema(trendings)

  return (
    <CarouselWrapper className="trendings">
      <CarouselComponent>
        {trendingsSchema.map((film) => {
          const isBookmarked = checkIfIsBookmarked(
            String(film.id),
            bookmarkedMovies?.bookmarkedFilms,
            "filmId"
          )

          return (
            <Banner key={film.id} className="keen-slider__slide">
              <BannerWrapper>
                <TrendingCard
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
                        {new Date(film.first_air_date).toLocaleDateString("en-US")}
                      </p>
                    </div>
                    <MovieTypePin>
                      <p>{film.media_type}</p>
                    </MovieTypePin>
                    <BookmarkButton
                      onMouseOver={() => setChangeBookmark(true)}
                      onMouseLeave={() => setChangeBookmark(false)}
                      disabled={bookmarkingData}
                      onClick={(e) => {
                        e.stopPropagation()

                        handleSetBookmark(
                          film,
                          film.media_type ?? "movie",
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
                </TrendingCard>
              </BannerWrapper>
            </Banner>
          )
        })}
      </CarouselComponent>
    </CarouselWrapper>
  )
}

export default TrendingsCarousel
