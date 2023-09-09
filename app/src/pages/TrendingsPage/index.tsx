import PageContainer from "../../components/PageContainer"
import { useContext, useEffect, useState } from "react"
import { ColumnsContainer, TrendingsColumn } from "./styles"
import { AppContextProvider } from "../../contexts/AppContext"
import { UserContextProvider } from "../../contexts/UserContext"
import formatSchema from "../../utils/formatSchema"
import MovieModal from "../../components/MovieModal"
import { useMutation } from "react-query"
import { api } from "../../lib/api"
import { FilmProps } from "../../types"
import SeeMore from "../../components/SeeMore"
import GridDataComponent from "../../components/GridDataComponent"

const TrendingPage = () => {
  const { setCurrentPage, currentPage } = useContext(AppContextProvider)

  const { bookmarkedMovies } = useContext(UserContextProvider)

  const [trendingsView, setTrendingsView] = useState<FilmProps[]>(
    [] as FilmProps[]
  )

  const trendingsViewMainData = useMutation({
    mutationFn: async (currentPage: string) => {
      try {
        const response = await api.post("/trending-movies", {
          data: currentPage,
        })

        if (!trendingsView.length) {
          setTrendingsView(response.data.results)
        } else {
          const concatItems = trendingsView.concat(response.data.results)

          setTrendingsView(concatItems)
        }

        return response
      } catch (e) {
        throw new Error("There was an error getting trendings...")
      }
    },
  })

  const fetchTrendings = async () => {
    await trendingsViewMainData.mutateAsync(String(currentPage))
  }

  useEffect(() => {
    fetchTrendings()
  }, [currentPage])

  if (!bookmarkedMovies || !trendingsViewMainData) return <></>

  const formatMoviesSchema = formatSchema(trendingsView)

  return (
    <PageContainer>
      <ColumnsContainer>
        <h1>Trendings</h1>
        <TrendingsColumn>
          <GridDataComponent dataToList={formatMoviesSchema} />
        </TrendingsColumn>
        {!!formatMoviesSchema.length && currentPage < 10 && (
          <SeeMore setCurrentPage={setCurrentPage} />
        )}
      </ColumnsContainer>
      <MovieModal />
    </PageContainer>
  )
}

export default TrendingPage
