import { BookmarkSimple } from "@phosphor-icons/react"
import { useIsMobile } from "../../hooks/useIsMobile"

interface BookMarkPinType {
  isBookmarked: boolean
  changeOnHover: boolean
}

const BookmarkPinType = ({ isBookmarked, changeOnHover }: BookMarkPinType) => {
  const isMobile = useIsMobile(768)

  const manipulatePynColorHoverOnList = isMobile
    ? "fill"
    : changeOnHover
    ? "regular"
    : "fill"

  const manipulatePynColorHoverOutList = isMobile
    ? "regular"
    : changeOnHover
    ? "fill"
    : "regular"

  switch (isBookmarked) {
    case true:
      return (
        <BookmarkSimple
          key="on_list"
          color="#fff"
          weight={manipulatePynColorHoverOnList}
          size={25}
        />
      )
    case false:
      return (
        <BookmarkSimple
          key="out_list"
          weight={manipulatePynColorHoverOutList}
          color="#fff"
          size={25}
        />
      )

    default:
      return (
        <BookmarkSimple
          key="out_list"
          weight={changeOnHover ? "fill" : "regular"}
          color="#fff"
          size={25}
        />
      )
  }
}

export default BookmarkPinType
