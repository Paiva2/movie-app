import {
  Banner,
  BannerWrapper,
  BookmarkButton,
  CardOverlay,
  CarouselWrapper,
  MovieCard,
} from "./styles"
import CarouselComponent from "../CarouselComponent"
import { useContext } from "react"
import { UserContextProvider } from "../../contexts/UserContext"
import formatSchema from "../../utils/formatSchema"
import { AppContextProvider } from "../../contexts/AppContext"
import checkIfIsBookmarked from "../../utils/checkIfIsBookmarked"
import BookmarkPinType from "../BookmarkPinType"

const MoviesCarousel = () => {
  const {
    bookmarkedMovies,
    bookmarkingData,
    setSelectedFilmDescriptions,
    handleSetBookmark,
  } = useContext(UserContextProvider)

  const { openMovieModal, setOpenMovieModal } = useContext(AppContextProvider)

  const { homeMovies, homeMoviesIsLoading } = useContext(AppContextProvider)

  if (homeMoviesIsLoading || !homeMovies || !bookmarkedMovies) return <></>

  const homeMoviesNewSchema = formatSchema(homeMovies?.data, "movie")

  return (
    <CarouselWrapper className="movies">
      <CarouselComponent>
        {homeMoviesNewSchema?.map((film) => {
          const isBookmarked = checkIfIsBookmarked(
            String(film.id),
            bookmarkedMovies?.bookmarkedFilms,
            "filmId"
          )

          return (
            <Banner key={film.id} className="keen-slider__slide">
              <BannerWrapper>
                <MovieCard
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
                    <BookmarkButton
                      disabled={bookmarkingData}
                      onClick={(e) => {
                        e.stopPropagation()

                        handleSetBookmark(
                          film,
                          "movie",
                          isBookmarked ? "remove" : "insert"
                        )
                      }}
                    >
                      <BookmarkPinType isBookmarked={isBookmarked} />
                    </BookmarkButton>
                  </CardOverlay>
                </MovieCard>
              </BannerWrapper>
            </Banner>
          )
        })}
      </CarouselComponent>
    </CarouselWrapper>
  )
}

export default MoviesCarousel
