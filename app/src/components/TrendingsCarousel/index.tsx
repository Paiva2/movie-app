import { useState, useContext } from "react"
import {
  Banner,
  BannerWrapper,
  BookmarkButton,
  CardOverlay,
  CarouselWrapper,
  TrendingCard,
} from "./styles"
import CarouselComponent from "../CarouselComponent"
import { BookmarkSimple } from "@phosphor-icons/react"
import { useQuery } from "react-query"
import { UserContextProvider } from "../../contexts/UserContext"
import { FilmProps } from "../../types"
import { api } from "../../lib/api"
import formatSchema from "../../utils/formatSchema"

const TrendingsCarousel = () => {
  const {
    bookmarkedMovies,
    openMovieModal,
    handleSetBookmark,
    setOpenMovieModal,
    setSelectedFilmDescriptions,
  } = useContext(UserContextProvider)

  const [changeBookmark, setChangeBookmark] = useState(false)

  const { data: trendings, isLoading } = useQuery({
    queryKey: ["getHomeTrendings"],

    queryFn: async () => {
      try {
        const response = await api.get<FilmProps[]>("/trending-movies")

        return response
      } catch (e) {
        console.log("There was an error...")
      }
    },
  })

  if (isLoading || !trendings) return null

  const bookmarkedFilmsIds = bookmarkedMovies?.bookmarkedFilms?.map(
    (films) => films.filmId
  )

  const functionCheckIfIsBookmarked = (id: number) => {
    return bookmarkedFilmsIds?.includes(String(id))
  }

  const trendingsSchema = formatSchema(trendings?.data)

  return (
    <CarouselWrapper className="trendings">
      <CarouselComponent>
        {trendingsSchema.map((film) => {
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
                        {new Date(film.first_air_date).toLocaleDateString(
                          "en-US"
                        )}
                      </p>
                    </div>
                    <BookmarkButton
                      onMouseOver={() => setChangeBookmark(true)}
                      onMouseLeave={() => setChangeBookmark(false)}
                      onClick={(e) => {
                        e.stopPropagation()

                        handleSetBookmark(
                          film,
                          film.media_type ?? "movie",
                          functionCheckIfIsBookmarked(film.id)
                            ? "remove"
                            : "insert"
                        )
                      }}
                    >
                      {functionCheckIfIsBookmarked(film.id) ? (
                        <BookmarkSimple
                          key="on_list"
                          color="#fff"
                          weight={changeBookmark ? "regular" : "fill"}
                          size={25}
                        />
                      ) : (
                        <BookmarkSimple
                          key="out_list"
                          weight={changeBookmark ? "fill" : "regular"}
                          color="#fff"
                          size={25}
                        />
                      )}
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
