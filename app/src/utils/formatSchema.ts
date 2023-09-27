import { FilmProps } from "../types"

export default function formatSchema(
  arrayToFormat: FilmProps[],
  categoryDefault?: string
) {
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
        media_type: movies.media_type ?? movies.mediaType ?? categoryDefault,
        genre_ids: movies.genre_ids,
      },
    ]

    return newFilms
  }, [])

  return formattedSchema
}

// the bookmarked movies schema is different because filmId on TMB Api is returned as "id",
// when we create a new bookmarked film the .id is the id created by default on database and not the filmId
export function formatBookmarkedMoviesSchema(
  arrayToFormat: FilmProps[],
  categoryDefault?: string
) {
  const formattedSchema = arrayToFormat.reduce((acc: FilmProps[], movies) => {
    const newFilms = [
      ...acc,
      {
        id: movies.filmId,
        name: movies.title ?? movies.name,
        poster_path: movies.poster_path || movies.poster,
        backdrop_path: movies.backdrop_path,
        first_air_date: movies.release_date ?? movies.first_air_date,
        overview: movies.overview,
        media_type: movies.media_type ?? movies.mediaType ?? categoryDefault,
      },
    ]

    return newFilms as FilmProps[]
  }, [])

  return formattedSchema
}
