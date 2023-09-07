import { BookmarkSimple } from "@phosphor-icons/react"

interface BookMarkPinType {
  isBookmarked: boolean
  changeOnHover: boolean
}

const BookmarkPinType = ({ isBookmarked, changeOnHover }: BookMarkPinType) => {
  switch (isBookmarked) {
    case true:
      return (
        <BookmarkSimple
          key="on_list"
          color="#fff"
          weight={changeOnHover ? "regular" : "fill"}
          size={25}
        />
      )
    case false:
      return (
        <BookmarkSimple
          key="out_list"
          weight={changeOnHover ? "fill" : "regular"}
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
