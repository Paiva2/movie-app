import PageContainer from "../../components/PageContainer"
import { useContext, useState } from "react"
import {
  BookmarkButton,
  BookmarkedCard,
  BookmarkedColumn,
  CardOverlay,
  ColumnsContainer,
} from "./styles"
import { AppContextProvider } from "../../contexts/AppContext"
import { UserContextProvider } from "../../contexts/UserContext"
import checkIfIsBookmarked from "../../utils/checkIfIsBookmarked"
import formatSchema from "../../utils/formatSchema"
import MovieModal from "../../components/MovieModal"
import BookmarkPinType from "../../components/BookmarkPinType"

const MoviesPage = () => {
  const { homeMovies, openMovieModal, setOpenMovieModal } =
    useContext(AppContextProvider)

  const { handleSetBookmark, setSelectedFilmDescriptions, bookmarkedMovies } =
    useContext(UserContextProvider)

  const [changeBookmark, setChangeBookmark] = useState(false)

  if (!homeMovies || !bookmarkedMovies) return <></>

  const formatMoviesSchema = formatSchema(homeMovies.data, "movie")

  return (
    <PageContainer>
      <ColumnsContainer>
        <h1>Movies</h1>
        <BookmarkedColumn>
          {formatMoviesSchema.map((movie) => {
            const isBookmarked = checkIfIsBookmarked(
              String(movie.id),
              bookmarkedMovies?.bookmarkedFilms,
              "filmId"
            )

            return (
              <BookmarkedCard
                onClick={() => {
                  setOpenMovieModal(!openMovieModal)

                  setSelectedFilmDescriptions(movie)
                }}
                key={movie.id}
              >
                <img
                  alt={movie.name}
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                />
                <CardOverlay className="card-overlay">
                  <div>
                    <p>{movie.name}</p>
                    <p>
                      Release:{" "}
                      {new Date(movie.first_air_date).toLocaleDateString(
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
                        movie,
                        movie.mediaType!,
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
              </BookmarkedCard>
            )
          })}
        </BookmarkedColumn>
      </ColumnsContainer>
      <MovieModal />
    </PageContainer>
  )
}

export default MoviesPage
