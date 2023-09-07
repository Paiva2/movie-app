import { Dispatch, SetStateAction } from "react"
import { SeeMoreButton } from "./styles"

interface SeeMoreProps {
  setCurrentPage: Dispatch<SetStateAction<number>>
}

const SeeMore = ({ setCurrentPage }: SeeMoreProps) => {
  return (
    <SeeMoreButton>
      <button
        type="button"
        onClick={() => {
          setCurrentPage((oldValue) => oldValue + 1)
        }}
      >
        See more
      </button>
    </SeeMoreButton>
  )
}

export default SeeMore
