export type FilmProps = {
  id: number
  name: string
  poster_path: string
  backdrop_path: string
  first_air_date: string
  overview: string
  release_date?: string
  title?: string
}

interface BookmarkSchema {
  film: FilmProps
  user: string
  action: string
}

export type BookmarkedFilmsSchema = {
  id: number
  name: string
  poster_path: string
  backdrop_path: string
  first_air_date: string
  overview: string
  release_date?: string
  title?: string
}

type BookmarkedMovies = {
  bookmarkedFilms: BookmarkedFilmsSchema[]
}
interface UserAuthentication {
  isUserAuth: boolean
  userToken: string
}

interface UserInformations {
  userToken: string
}

interface UserProfileSchema {
  id: string
  image: string
  username: string
}
