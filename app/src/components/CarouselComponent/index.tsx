import { useState, ReactNode, Fragment } from "react"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import {
  ArrowsContainer,
  CarouselContainer,
  LeftButton,
  RightButton,
} from "./styles"
import { CaretLeft, CaretRight } from "@phosphor-icons/react"

const CarouselComponent = ({
  children,
  perView = 7,
}: {
  children: ReactNode
  perView?: number
}) => {
  const [loadedCarousel, setLoadedCarousel] = useState(false)

  const [sliderRef, carouselRef] = useKeenSlider({
    mode: "free-snap",
    loop: true,
    slides: { perView: perView, spacing: 8 },
    breakpoints: {
      "(max-width: 768px)": {
        mode: "snap",
        slides: { perView: 1.5, spacing: 5 },
      },
    },

    created() {
      setLoadedCarousel(true)
    },
  })

  return (
    <Fragment>
      <CarouselContainer ref={sliderRef} className="keen-slider">
        {children}
      </CarouselContainer>
      {loadedCarousel && carouselRef.current && (
        <ArrowsContainer>
          <LeftButton
            className="arrowLeft"
            onClick={() => carouselRef.current?.prev()}
            type="button"
          >
            <CaretLeft weight="bold" size="45" />
          </LeftButton>

          <RightButton
            className="arrowRight"
            onClick={() => carouselRef.current?.next()}
            type="button"
          >
            <CaretRight weight="bold" size="45" />
          </RightButton>
        </ArrowsContainer>
      )}
    </Fragment>
  )
}

export default CarouselComponent
