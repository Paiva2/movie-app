import { FilmProps } from "../types"

export default function checkIfIsBookmarked(
  id: number | string,
  bookmarkeds: FilmProps[],
  idType: "id" | "filmId"
) {
  const isBookmarked = bookmarkeds.some(
    (bookmarked) =>
      String(bookmarked[idType as keyof typeof bookmarked]) === String(id)
  )

  return isBookmarked
}
