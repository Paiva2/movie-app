import { useContext, Fragment } from "react"
import { UserContextProvider } from "../../contexts/UserContext"
import { formatBookmarkedMoviesSchema } from "../../utils/formatSchema"
import {
  BookmarkButton,
  BookmarkedCard,
  BookmarkedColumn,
  CardOverlay,
  ColumnsContainer,
} from "./styles"
import PageContainer from "../../components/PageContainer"
import { FilmProps } from "../../types"
import MovieModal from "../../components/MovieModal"
import BookmarksPlaceholder from "../../components/BookmaksPlaceholder"
import { AppContextProvider } from "../../contexts/AppContext"
import BookmarkPinType from "../../components/BookmarkPinType"

interface ColumnSchema {
  title: string
  bookmarkeds: FilmProps[]
}

const UserBookmarks = () => {
  const { bookmarkedMovies, handleSetBookmark, setSelectedFilmDescriptions } =
    useContext(UserContextProvider)

  const { openMovieModal, setOpenMovieModal } = useContext(AppContextProvider)

  if (!bookmarkedMovies?.bookmarkedFilms) return null

  const bookmarkedFilmsIds = bookmarkedMovies?.bookmarkedFilms?.map(
    (films) => films.filmId
  )

  const checkIfIsBookmarked = (id: string) => {
    return bookmarkedFilmsIds?.includes(id)
  }

  const formattedBookmarkedMoviesSchema = formatBookmarkedMoviesSchema(
    bookmarkedMovies.bookmarkedFilms
  )

  const bookmarkColumnsInitiatorSchema = [
    {
      title: "Bookmarked Movies",
      bookmarkeds: [] as FilmProps[],
    },
    {
      title: "Bookmarked Tv Show's",
      bookmarkeds: [] as FilmProps[],
    },
  ]

  const formatBookmarkColumns: ColumnSchema[] =
    formattedBookmarkedMoviesSchema.reduce((acc, item) => {
      if (item.media_type === "movie") {
        acc[0]?.bookmarkeds?.push(item)
      } else if (item.media_type === "tv") {
        acc[1]?.bookmarkeds?.push(item)
      }

      return acc
    }, bookmarkColumnsInitiatorSchema)

  if (!bookmarkedMovies?.bookmarkedFilms.length) {
    return <BookmarksPlaceholder />
  }

  return (
    <PageContainer>
      <ColumnsContainer>
        {formatBookmarkColumns.map((columnType) => {
          return (
            <Fragment key={columnType.title}>
              <h1>{!!columnType.bookmarkeds.length && columnType.title}</h1>
              <BookmarkedColumn>
                {columnType.bookmarkeds.map((itens) => {
                  const isBookmarked = checkIfIsBookmarked(String(itens.id))

                  return (
                    <BookmarkedCard
                      onClick={() => {
                        setOpenMovieModal(!openMovieModal)

                        setSelectedFilmDescriptions(itens)
                      }}
                      key={itens.id}
                    >
                      <img
                        alt={itens.name}
                        src={`https://image.tmdb.org/t/p/w500${itens.poster_path}`}
                      />
                      <CardOverlay className="card-overlay">
                        <div>
                          <p>{itens.name}</p>
                          <p>
                            Release:{" "}
                            {new Date(itens.first_air_date).toLocaleDateString(
                              "en-US"
                            )}
                          </p>
                        </div>
                        <BookmarkButton
                          onClick={(e) => {
                            e.stopPropagation()

                            handleSetBookmark(
                              itens,
                              itens.mediaType!,
                              isBookmarked ? "remove" : "insert"
                            )
                          }}
                        >
                          <BookmarkPinType isBookmarked={isBookmarked} />
                        </BookmarkButton>
                      </CardOverlay>
                    </BookmarkedCard>
                  )
                })}
              </BookmarkedColumn>
            </Fragment>
          )
        })}
      </ColumnsContainer>
      <MovieModal />
    </PageContainer>
  )
}

export default UserBookmarks
