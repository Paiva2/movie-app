import { FilmProps } from "../types"

export default function formatSchema(arrayToFormat: FilmProps[]) {
  const formattedSchema = arrayToFormat.reduce((acc: FilmProps[], movies) => {
    const newFilms = [
      ...acc,
      {
        id: movies.id,
        name: movies.title ?? "",
        poster_path: movies.poster_path,
        backdrop_path: movies.backdrop_path,
        first_air_date: movies.release_date ?? "",
        overview: movies.overview,
      },
    ]

    return newFilms
  }, [])

  return formattedSchema
}
