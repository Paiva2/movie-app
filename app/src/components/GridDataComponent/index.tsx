import { BookmarkButton, Card, CardOverlay, Column } from "./styles"
import checkIfIsBookmarked from "../../utils/checkIfIsBookmarked"
import BookmarkPinType from "../BookmarkPinType"
import { UserContextProvider } from "../../contexts/UserContext"
import { useContext, useState } from "react"
import { AppContextProvider } from "../../contexts/AppContext"

const GridDataComponent = ({ dataToList }) => {
  const { openMovieModal, setOpenMovieModal } = useContext(AppContextProvider)

  const { handleSetBookmark, setSelectedFilmDescriptions, bookmarkedMovies } =
    useContext(UserContextProvider)

  const [changeBookmark, setChangeBookmark] = useState(false)

  return (
    <Column>
      {dataToList.map((movie, idx) => {
        if (!movie.poster_path) return

        const isBookmarked = checkIfIsBookmarked(
          String(movie.id),
          bookmarkedMovies?.bookmarkedFilms,
          "filmId"
        )

        return (
          <Card
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
                  {new Date(movie.first_air_date).toLocaleDateString("en-US")}
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
          </Card>
        )
      })}
    </Column>
  )
}

export default GridDataComponent
