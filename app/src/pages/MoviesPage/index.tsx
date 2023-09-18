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

const MoviesPage = () => {
  const { homeMovies, setCurrentPage, currentPage } = useContext(AppContextProvider)

  const { bookmarkedMovies } = useContext(UserContextProvider)

  const [moviesView, setMoviesView] = useState<FilmProps[]>([] as FilmProps[])

  const moviesViewMainData = useMutation({
    mutationFn: async (currentPage: string) => {
      try {
        const response = await api.patch("/single_page_movies", {
          data: {
            currentPage,
          },
        })

        if (!moviesView.length) {
          setMoviesView(response.data.results)
        } else {
          const concatItems = moviesView.concat(response.data.results)

          setMoviesView(concatItems)
        }

        return response
      } catch (e) {
        throw new Error("There was an error getting movies...")
      }
    },
  })

  const fetchMoviesView = async () => {
    await moviesViewMainData.mutateAsync(String(currentPage))
  }

  useEffect(() => {
    fetchMoviesView()
  }, [currentPage])

  if (!homeMovies || !bookmarkedMovies || !moviesViewMainData) return <></>

  const formatMoviesSchema = formatSchema(moviesView, "movie")

  return (
    <PageContainer>
      <ColumnsContainer>
        <h1>Movies</h1>
        <GridDataComponent dataToList={formatMoviesSchema} />
        {!!formatMoviesSchema.length && currentPage < 10 && (
          <SeeMore setCurrentPage={setCurrentPage} />
        )}
      </ColumnsContainer>
      <MovieModal />
    </PageContainer>
  )
}

export default MoviesPage
