import { FilmProps } from "../types"

export default function formatSchema(arrayToFormat: FilmProps[]) {
  const formattedSchema = arrayToFormat.reduce((acc: FilmProps[], movies) => {
    const newFilms = [
      ...acc,
      {
        id: movies.id,
        name: movies.title ?? movies.name,
        poster_path: movies.poster_path || movies.poster,
        backdrop_path: movies.backdrop_path,
        first_air_date: movies.release_date ?? movies.first_air_date,
        overview: movies.overview,
        media_type: movies.mediaType,
      },
    ]

    return newFilms
  }, [])

  return formattedSchema
}
