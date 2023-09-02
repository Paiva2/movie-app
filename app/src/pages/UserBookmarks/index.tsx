import { useState, useContext, Fragment } from "react"
import { BookmarkSimple } from "@phosphor-icons/react"
import { UserContextProvider } from "../../contexts/UserContext"
import formatSchema from "../../utils/formatSchema"
import {
  BookmarkButton,
  BookmarkedCard,
  BookmarkedColumn,
  CardOverlay,
  ColumnsContainer,
} from "./styles"
import PageContainer from "../../components/PageContainer"
import { FilmProps } from "../../types"

interface ColumnSchema {
  title: string
  bookmarkeds: FilmProps[]
}

const UserBookmarks = () => {
  const { bookmarkedMovies, handleSetBookmark } =
    useContext(UserContextProvider)

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
    formatBookmarkedMoviesSchema.reduce((acc, item) => {
      if (item.media_type === "movie") {
        acc[0]?.bookmarkeds?.push(item)
      } else if (item.media_type === "tv") {
        acc[1]?.bookmarkeds?.push(item)
      }

      return acc
    }, bookmarkColumnsInitiatorSchema)

  return (
    <PageContainer>
      <ColumnsContainer>
        {formatBookmarkColumns.map((columnType) => {
          return (
            <Fragment>
              <h1>{columnType.title}</h1>
              <BookmarkedColumn>
                {columnType.bookmarkeds.map((itens) => {
                  return (
                    <BookmarkedCard>
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
                          onMouseOver={() => setChangeBookmark(true)}
                          onMouseLeave={() => setChangeBookmark(false)}
                          onClick={(e) => {
                            e.stopPropagation()

                            handleSetBookmark(
                              itens,
                              itens.mediaType!,
                              functionCheckIfIsBookmarked(itens.id)
                                ? "remove"
                                : "insert"
                            )
                          }}
                        >
                          {functionCheckIfIsBookmarked(itens.id) ? (
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
                    </BookmarkedCard>
                  )
                })}
              </BookmarkedColumn>
            </Fragment>
          )
        })}
      </ColumnsContainer>
    </PageContainer>
  )
}

export default UserBookmarks
