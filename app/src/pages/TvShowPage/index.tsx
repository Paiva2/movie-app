import PageContainer from "../../components/PageContainer"
import { useContext, useEffect, useState } from "react"
import { ColumnsContainer } from "./styles"
import { AppContextProvider } from "../../contexts/AppContext"
import { UserContextProvider } from "../../contexts/UserContext"
import formatSchema from "../../utils/formatSchema"
import MovieModal from "../../components/MovieModal"
import { useMutation } from "react-query"
import { api } from "../../lib/api"
import { FilmProps } from "../../types"
import SeeMore from "../../components/SeeMore"
import GridDataComponent from "../../components/GridDataComponent"

const TvShowPage = () => {
  const { homeMovies, setCurrentPage, currentPage } = useContext(AppContextProvider)

  const { bookmarkedMovies } = useContext(UserContextProvider)

  const [tvShowsView, setTvShowsView] = useState<FilmProps[]>([] as FilmProps[])

  const tvShowsMainData = useMutation({
    mutationFn: async (currentPage: string) => {
      try {
        const response = await api.patch("/single_page_tv-show", {
          data: currentPage,
        })

        if (!tvShowsView.length) {
          setTvShowsView(response.data.results)
        } else {
          const concatItems = tvShowsView.concat(response.data.results)

          setTvShowsView(concatItems)
        }

        return response
      } catch (e) {
        throw new Error("There was an error getting tv shows...")
      }
    },
  })

  const fetchTvShowsView = async () => {
    await tvShowsMainData.mutateAsync(String(currentPage))
  }

  useEffect(() => {
    fetchTvShowsView()
  }, [currentPage])

  if (!homeMovies || !bookmarkedMovies || !tvShowsMainData) return <></>

  const formatMoviesSchema = formatSchema(tvShowsView, "tv")

  return (
    <PageContainer>
      <ColumnsContainer>
        <h1>Tv Show's</h1>
        <GridDataComponent dataToList={formatMoviesSchema} />
        {!!formatMoviesSchema.length && currentPage < 10 && (
          <SeeMore setCurrentPage={setCurrentPage} />
        )}
      </ColumnsContainer>
      <MovieModal />
    </PageContainer>
  )
}

export default TvShowPage
