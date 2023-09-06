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
import { BookmarkSimple } from "@phosphor-icons/react"
import { useQuery } from "react-query"
import { UserContextProvider } from "../../contexts/UserContext"
import { FilmProps } from "../../types"
import { api } from "../../lib/api"
import formatSchema from "../../utils/formatSchema"

const TvShowsCarousel = () => {
  const {
    bookmarkedMovies,
    openMovieModal,
    bookmarkingData,
    handleSetBookmark,
    setOpenMovieModal,
    setSelectedFilmDescriptions,
  } = useContext(UserContextProvider)

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

  if (isLoading || !tvShows) return null

  const bookmarkedFilmsIds = bookmarkedMovies?.bookmarkedFilms?.map(
    (films) => films.filmId
  )

  const checkIfIsBookmarked = (id: number) => {
    return bookmarkedFilmsIds?.includes(String(id))
  }

  const homeTvShowsSchema = formatSchema(tvShows?.data, "tv")

  return (
    <CarouselWrapper className="tv-shows">
      <CarouselComponent>
        {homeTvShowsSchema?.map((film) => {
          if (!film.poster_path) return <></>

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
                          checkIfIsBookmarked(film.id) ? "remove" : "insert"
                        )
                      }}
                    >
                      {checkIfIsBookmarked(film.id) ? (
                        <BookmarkSimple
                          color="#fff"
                          weight={changeBookmark ? "regular" : "fill"}
                          size={25}
                        />
                      ) : (
                        <BookmarkSimple
                          weight={changeBookmark ? "fill" : "regular"}
                          color="#fff"
                          size={25}
                        />
                      )}
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
