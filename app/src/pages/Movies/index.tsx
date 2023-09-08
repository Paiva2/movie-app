import PageContainer from "../../components/PageContainer"
import { useContext, useEffect, useState } from "react"
import {
  BookmarkButton,
  CardOverlay,
  ColumnsContainer,
  MovieCard,
  MovieColumn,
} from "./styles"
import { AppContextProvider } from "../../contexts/AppContext"
import { UserContextProvider } from "../../contexts/UserContext"
import checkIfIsBookmarked from "../../utils/checkIfIsBookmarked"
import formatSchema from "../../utils/formatSchema"
import MovieModal from "../../components/MovieModal"
import BookmarkPinType from "../../components/BookmarkPinType"
import { useMutation } from "react-query"
import { api } from "../../lib/api"
import { FilmProps } from "../../types"
import SeeMore from "../../components/SeeMore"

const MoviesPage = () => {
  const {
    homeMovies,
    openMovieModal,
    setOpenMovieModal,
    setCurrentPage,
    currentPage,
  } = useContext(AppContextProvider)

  const { handleSetBookmark, setSelectedFilmDescriptions, bookmarkedMovies } =
    useContext(UserContextProvider)

  const [changeBookmark, setChangeBookmark] = useState(false)
  const [moviesView, setMoviesView] = useState<FilmProps[]>([] as FilmProps[])

  const moviesViewMainData = useMutation({
    mutationFn: async (page: string) => {
      try {
        const response = await api.patch("/single_page_movies", { data: page })

        if (!moviesView.length) {
          setMoviesView(response.data.results)
        } else {
          const concatItems = moviesView.concat(response.data.results)

          setMoviesView(concatItems)
        }

        return response
      } catch (e) {
        throw new Error("There was an error getting movies...")
      }
    },
  })

  const fetchMoviesView = async () => {
    await moviesViewMainData.mutateAsync(String(currentPage))
  }

  useEffect(() => {
    fetchMoviesView()
  }, [currentPage])

  if (!homeMovies || !bookmarkedMovies || !moviesViewMainData) return <></>

  const formatMoviesSchema = formatSchema(moviesView, "movie")

  return (
    <PageContainer>
      <ColumnsContainer>
        <h1>Movies</h1>
        <MovieColumn>
          {formatMoviesSchema.map((movie, idx) => {
            if (!movie.poster_path) return

            const isBookmarked = checkIfIsBookmarked(
              String(movie.id),
              bookmarkedMovies?.bookmarkedFilms,
              "filmId"
            )

            return (
              <MovieCard
                onClick={() => {
                  setOpenMovieModal(!openMovieModal)

                  setSelectedFilmDescriptions(movie)
                }}
                key={idx}
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
              </MovieCard>
            )
          })}
        </MovieColumn>
        {!!formatMoviesSchema.length && currentPage < 10 && (
          <SeeMore setCurrentPage={setCurrentPage} />
        )}
      </ColumnsContainer>
      <MovieModal />
    </PageContainer>
  )
}

export default MoviesPage
