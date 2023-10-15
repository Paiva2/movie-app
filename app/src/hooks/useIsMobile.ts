import { useEffect, useState } from "react"

export const useIsMobile = (testResolution = 768) => {
  const [isMobile, setIsMobile] = useState<{
    width?: number
    height?: number
  }>({
    width: undefined,
    height: undefined,
  })

  function handleResize() {
    setIsMobile({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const checkResolution = !!isMobile.width && isMobile.width <= testResolution

  return checkResolution
}
