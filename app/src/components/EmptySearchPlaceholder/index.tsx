import { FilmReel } from "@phosphor-icons/react"
import { EmptySearchContainer, EmptySearchTexts } from "./styles"

const EmptySearchPlaceholder = () => {
  return (
    <EmptySearchContainer>
      <FilmReel size={70} weight="thin" color="#fff" />
      <EmptySearchTexts>
        <h1>Nothing here...</h1>
        <a href="/">Check some films and movies!</a>
      </EmptySearchTexts>
    </EmptySearchContainer>
  )
}

export default EmptySearchPlaceholder
