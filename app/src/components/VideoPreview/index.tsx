import ReactPlayer from "react-player"
import { VideoWrapper } from "./styles"

interface VideoPreviewProps {
  bookmarkedUrl: string
}

const VideoPreview = ({ bookmarkedUrl }: VideoPreviewProps) => {
  return (
    <VideoWrapper>
      <ReactPlayer
        muted
        controls
        playing={false}
        url={`https://www.youtube.com/watch?v=${bookmarkedUrl}`}
        width="100%"
        height="100%"
      />
    </VideoWrapper>
  )
}

export default VideoPreview
