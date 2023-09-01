import { useState, useContext } from "react"
import { BookmarkSimple } from "@phosphor-icons/react"
import { UserContextProvider } from "../../contexts/UserContext"
import formatSchema from "../../utils/formatSchema"
import PageContainer from "../PageContainer"
import { BookmarkButton, BookmarkedCard, CardOverlay } from "./styles"

const UserBookmarks = () => {
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
    <PageContainer>
      <div
        style={{
          padding: "50px",
          display: "flex",
          flexDirection: "column",
          gap: "px",
        }}
      >
        <h1>Bookmarked Movies</h1>
        <div
          style={{
            display: "flex",
            /* gridTemplateColumns: "repeat(auto-fit, minmax(200px, 2))", */
            gap: "30px",
            flexWrap: "wrap",
          }}
        >
          {formatBookmarkedMoviesSchema.map((itens) => {
            return (
              <>
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
              </>
            )
          })}
        </div>
      </div>
    </PageContainer>
  )
}

export default UserBookmarks
