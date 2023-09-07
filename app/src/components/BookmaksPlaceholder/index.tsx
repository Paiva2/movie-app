import { Popcorn } from "@phosphor-icons/react"
import { NoBookmarksContainer, NoBookmarksTexts } from "./styles"

const BookmarksPlaceholder = () => {
  return (
    <NoBookmarksContainer>
      <Popcorn size={70} weight="regular" color="#fff" />
      <NoBookmarksTexts>
        <h1>No bookmarkeds here yet...</h1>
        <a href="/">Check some films and movies to bookmark!</a>
      </NoBookmarksTexts>
    </NoBookmarksContainer>
  )
}

export default BookmarksPlaceholder
