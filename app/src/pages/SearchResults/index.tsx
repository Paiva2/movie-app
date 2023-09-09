import PageContainer from "../../components/PageContainer"
import { useContext, useEffect, useState } from "react"
import { ColumnsContainer, DataColumn } from "./styles"
import { UserContextProvider } from "../../contexts/UserContext"
import formatSchema from "../../utils/formatSchema"
import MovieModal from "../../components/MovieModal"
import { useMutation } from "react-query"
import { api } from "../../lib/api"
import { FilmProps } from "../../types"
import EmptySearchPlaceholder from "../../components/EmptySearchPlaceholder"
import SeeMore from "../../components/SeeMore"
import GridDataComponent from "../../components/GridDataComponent"

const SearchResults = () => {
  const { bookmarkedMovies } = useContext(UserContextProvider)

  const [keywordItems, setKeywordItems] = useState<FilmProps[]>(
    [] as FilmProps[]
  )
  const [currentPage, setCurrentPage] = useState(1)
  const [noSearchFound, setNoSearchFound] = useState(false)

  const search = new URLSearchParams(document.location.search)

  const keywordParams = search.get("keyword")

  const keywordsMainData = useMutation({
    mutationFn: async (currentPage: string) => {
      try {
        const { data } = await api.get(
          `/search_data/?search=${keywordParams}?&current_page=${currentPage}`
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
          <DataColumn>
            <GridDataComponent dataToList={formatMoviesSchema} />
          </DataColumn>
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
