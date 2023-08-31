import { useState, useContext } from "react"
import {
  Banner,
  BannerWrapper,
  BookmarkButton,
  CardOverlay,
  CarouselWrapper,
  RecentlyAddedCard,
} from "./styles"
import CarouselComponent from "../CarouselComponent"
import { BookmarkSimple } from "@phosphor-icons/react"
import { useQuery } from "react-query"
import { UserContextProvider } from "../../contexts/UserContext"
import { FilmProps } from "../../types"
import { api } from "../../lib/api"

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

  if (isLoading) return null

  const bookmarkedFilmsIds = bookmarkedMovies?.bookmarkedFilms?.map(
    (films) => films.id
  )

  const functionCheckIfIsBookmarked = (id: number) => {
    return bookmarkedFilmsIds?.includes(String(id))
  }

  return (
    <CarouselWrapper className="trendings">
      <CarouselComponent>
        {trendings?.data.map((film) => {
          return (
            <Banner key={film.id} className="keen-slider__slide">
              <BannerWrapper>
                <RecentlyAddedCard
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
                          size={35}
                        />
                      ) : (
                        <BookmarkSimple
                          key="out_list"
                          weight={changeBookmark ? "fill" : "regular"}
                          color="#fff"
                          size={35}
                        />
                      )}
                    </BookmarkButton>
                  </CardOverlay>
                </RecentlyAddedCard>
              </BannerWrapper>
            </Banner>
          )
        })}
      </CarouselComponent>
    </CarouselWrapper>
  )
}

export default TrendingsCarousel
