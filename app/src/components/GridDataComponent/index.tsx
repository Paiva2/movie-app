import {
  BookmarkButton,
  Card,
  CardOverlay,
  Column,
  MovieTypePin,
} from "./styles"
import checkIfIsBookmarked from "../../utils/checkIfIsBookmarked"
import BookmarkPinType from "../BookmarkPinType"
import { UserContextProvider } from "../../contexts/UserContext"
import { useContext, useState } from "react"
import { AppContextProvider } from "../../contexts/AppContext"
import { FilmProps } from "../../types"

const GridDataComponent = ({ dataToList }: { dataToList: FilmProps[] }) => {
  const { openMovieModal, setOpenMovieModal } = useContext(AppContextProvider)

  const { handleSetBookmark, setSelectedFilmDescriptions, bookmarkedMovies } =
    useContext(UserContextProvider)

  const [changeBookmark, setChangeBookmark] = useState(false)

  if (!bookmarkedMovies) return <></>

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
              <MovieTypePin>
                <p>{movie.media_type}</p>
              </MovieTypePin>
              <BookmarkButton
                onMouseOver={() => setChangeBookmark(true)}
                onMouseLeave={() => setChangeBookmark(false)}
                onClick={(e) => {
                  e.stopPropagation()

                  handleSetBookmark(
                    movie,
                    movie.media_type!,
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
