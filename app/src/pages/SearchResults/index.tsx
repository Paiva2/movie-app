import PageContainer from "../../components/PageContainer"
import { useContext, useEffect, useState } from "react"
import {
  BookmarkButton,
  BookmarkedCard,
  BookmarkedColumn,
  CardOverlay,
  ColumnsContainer,
  MovieTypePin,
} from "./styles"
import { AppContextProvider } from "../../contexts/AppContext"
import { UserContextProvider } from "../../contexts/UserContext"
import checkIfIsBookmarked from "../../utils/checkIfIsBookmarked"
import formatSchema from "../../utils/formatSchema"
import MovieModal from "../../components/MovieModal"
import { useMutation } from "react-query"
import { api } from "../../lib/api"
import { FilmProps } from "../../types"
import EmptySearchPlaceholder from "../../components/EmptySearchPlaceholder"
import SeeMore from "../../components/SeeMore"
import BookmarkPinType from "../../components/BookmarkPinType"

const SearchResults = () => {
  const { openMovieModal, setOpenMovieModal } = useContext(AppContextProvider)

  const { handleSetBookmark, setSelectedFilmDescriptions, bookmarkedMovies } =
    useContext(UserContextProvider)

  const [changeBookmark, setChangeBookmark] = useState(false)
  const [keywordItems, setKeywordItems] = useState<FilmProps[]>(
    [] as FilmProps[]
  )
  const [currentPage, setCurrentPage] = useState(1)
  const [noSearchFound, setNoSearchFound] = useState(false)

  const search = new URLSearchParams(document.location.search)

  const keywordParams = search.get("keyword")

  const keywordsMainData = useMutation({
    mutationFn: async (page: string) => {
      try {
        const { data } = await api.get(
          `/search_data/?search=${keywordParams}?&current_page=${page}`
        )

        !data?.data.results.length
          ? setNoSearchFound(true)
          : setNoSearchFound(false)

        if (!keywordItems.length) {
          setKeywordItems(data.data.results)
        } else {
          const concatItems = keywordItems.concat(data.data.results)

          setKeywordItems(concatItems)
        }

        return data
      } catch (e) {
        throw new Error("There was an error on searching...")
      }
    },
  })

  const totalQueryPages = keywordsMainData?.data?.data?.total_pages

  const totalQueryResults = keywordsMainData?.data?.data?.total_results

  const fetchParams = () => {
    keywordsMainData?.mutateAsync(String(currentPage))
  }

  useEffect(() => {
    if (keywordParams) {
      fetchParams()
    }
  }, [keywordParams, currentPage])

  const formatMoviesSchema = formatSchema(keywordItems)

  if (!keywordsMainData || !bookmarkedMovies) return <></>

  if (noSearchFound) {
    return <EmptySearchPlaceholder />
  }

  return (
    <PageContainer>
      {keywordItems.length && (
        <ColumnsContainer>
          <h1>
            {totalQueryResults} results for "{keywordParams}"
          </h1>
          <BookmarkedColumn>
            {formatMoviesSchema.map((movie, idx) => {
              if (!movie.poster_path) return

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
          {currentPage !== totalQueryPages && (
            <SeeMore setCurrentPage={setCurrentPage} />
          )}
        </ColumnsContainer>
      )}
      <MovieModal />
    </PageContainer>
  )
}

export default SearchResults
