export type FilmProps = {
  id: number
  name: string
  poster_path: string | undefined
  backdrop_path: string
  first_air_date: string
  overview: string
  release_date?: string
  title?: string
  poster?: string
  filmId?: string
  mediaType?: string
  media_type?: string
  genre_ids: number[]
}

export type BookmarkedFormatSchema = Omit<FilmProps, "id">
interface BookmarkSchema {
  film: FilmProps
  user: string
  action: string
  category: string
}

type BookmarkedMovies = {
  bookmarkedFilms: FilmProps[]
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
