import { BookmarkSimple } from "@phosphor-icons/react"

interface BookMarkPinType {
  isBookmarked: boolean
}

const BookmarkPinType = ({ isBookmarked }: BookMarkPinType) => {
  switch (isBookmarked) {
    case true:
      return <BookmarkSimple key="on_list" color="#fff" weight="fill" size={25} />
    case false:
      return (
        <BookmarkSimple key="out_list" weight="regular" color="#fff" size={25} />
      )

    default:
      return <></>
  }
}

export default BookmarkPinType
