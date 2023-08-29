export type FilmProps = {
  id: number
  name: string
  poster_path: string
  backdrop_path: string
  first_air_date: string
  overview: string
}

interface UserAuthentication {
  isUserAuth: boolean
  userToken: string
}
