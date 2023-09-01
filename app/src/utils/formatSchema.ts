import { BookmarkedFilmsSchema, FilmProps } from "../types"

export default function formatSchema(
  arrayToFormat: FilmProps[] | BookmarkedFilmsSchema[]
) {
  const formattedSchema = arrayToFormat.reduce((acc: FilmProps[], movies) => {
    const newFilms = [
      ...acc,
      {
        id: movies.id,
        name: movies.title ?? "",
        poster_path: movies.poster_path || movies.poster,
        backdrop_path: movies.backdrop_path,
        first_air_date: movies.release_date ?? movies.first_air_date,
        overview: movies.overview,
      },
    ]

    return newFilms
  }, [])

  return formattedSchema
}
