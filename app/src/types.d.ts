export type FilmProps = {
  id: number
  name: string
  poster_path: string
  backdrop_path: string
  first_air_date: string
  overview: string
}

type BookmarkedMovies = {
  bookmarkedFilms: Array<{
    id: string
    title: string
    poster: string
    overview: string
    first_air_date: string
    createdAt: string
  }>
}
interface UserAuthentication {
  isUserAuth: boolean
  userToken: string
}

interface UserInformations {
  userToken: string
}
