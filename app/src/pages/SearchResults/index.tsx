import { BookmarkSimple } from "@phosphor-icons/react"
import PageContainer from "../../components/PageContainer"
import { useContext, useEffect, useState } from "react"
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
import { useMutation } from "react-query"
import { api } from "../../lib/api"
import { FilmProps } from "../../types"

const SearchResults = () => {
  const { openMovieModal, setOpenMovieModal } = useContext(AppContextProvider)

  const { handleSetBookmark, setSelectedFilmDescriptions, bookmarkedMovies } =
    useContext(UserContextProvider)

  const [changeBookmark, setChangeBookmark] = useState(false)
  const [keywordItems, setKeywordItems] = useState<FilmProps[]>(
    [] as FilmProps[]
  )
  const [currentPage, setCurrentPage] = useState(1)

  const search = new URLSearchParams(document.location.search)

  const keywordParams = search.get("keyword")

  const keywordsMainData = useMutation({
    mutationFn: async (page: string) => {
      try {
        const { data } = await api.get(
          `/search_data/?search=${keywordParams}?&current_page=${page}`
        )

        if (!keywordItems.length) {
          setKeywordItems(data.data.results)
        } else {
          if (Array.isArray(keywordItems)) {
            data.data.results.forEach((data: FilmProps) => {
              setKeywordItems((oldValue) => [...oldValue, data])
            })
          }
        }

        return data
      } catch (e) {
        throw new Error("There was an error on searching...")
      }
    },
  })

  const totalQueryPages = keywordsMainData?.data?.data?.total_pages

  const totalQueryResults = keywordsMainData?.data?.data?.total_results

  const fetchParams = async () => {
    await keywordsMainData?.mutateAsync(String(currentPage))
  }

  useEffect(() => {
    if (keywordParams) {
      fetchParams()
    }
  }, [keywordParams, currentPage])

  const formatMoviesSchema = formatSchema(keywordItems)

  if (!keywordsMainData || !bookmarkedMovies) return <></>

  return (
    <PageContainer>
      <ColumnsContainer>
        <h1>
          {totalQueryResults} results for "{keywordParams}"
        </h1>
        <BookmarkedColumn>
          {formatMoviesSchema.map((movie) => {
            if (!movie.poster_path) return

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
                        checkIfIsBookmarked(
                          String(movie.id),
                          bookmarkedMovies?.bookmarkedFilms,
                          "filmId"
                        )
                          ? "remove"
                          : "insert"
                      )
                    }}
                  >
                    {checkIfIsBookmarked(
                      String(movie.id),
                      bookmarkedMovies?.bookmarkedFilms,
                      "filmId"
                    ) ? (
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
        {currentPage !== totalQueryPages && (
          <button
            type="button"
            onClick={() => {
              setCurrentPage((oldValue) => oldValue + 1)
            }}
          >
            See more
          </button>
        )}
      </ColumnsContainer>
      <MovieModal />
    </PageContainer>
  )
}

export default SearchResults
