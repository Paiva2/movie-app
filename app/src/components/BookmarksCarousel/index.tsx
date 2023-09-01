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
import { UserContextProvider } from "../../contexts/UserContext"
import formatSchema from "../../utils/formatSchema"

const BookmarksCarousel = () => {
  const {
    bookmarkedMovies,
    openMovieModal,
    handleSetBookmark,
    setOpenMovieModal,
    setSelectedFilmDescriptions,
  } = useContext(UserContextProvider)

  const [changeBookmark, setChangeBookmark] = useState(false)

  if (!bookmarkedMovies?.bookmarkedFilms) return null

  const bookmarkedFilmsIds = bookmarkedMovies?.bookmarkedFilms?.map(
    (films) => films.id
  )

  const functionCheckIfIsBookmarked = (id: number) => {
    return bookmarkedFilmsIds?.includes(id)
  }

  const formatBookmarkedMoviesSchema = formatSchema(
    bookmarkedMovies.bookmarkedFilms
  )

  return (
    <CarouselWrapper className="tv-shows">
      <CarouselComponent perView={formatBookmarkedMoviesSchema.length}>
        {formatBookmarkedMoviesSchema?.map((film) => {
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
                      <p>{film.title}</p>
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
                          functionCheckIfIsBookmarked(+film.id)
                            ? "remove"
                            : "insert"
                        )
                      }}
                    >
                      {functionCheckIfIsBookmarked(+film.id) ? (
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

export default BookmarksCarousel
