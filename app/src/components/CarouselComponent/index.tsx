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

const CarouselComponent = ({ children }: { children: ReactNode }) => {
  const [loadedCarousel, setLoadedCarousel] = useState(false)

  const [sliderRef, carouselRef] = useKeenSlider({
    loop: true,
    rtl: true,
    slides: { perView: 9, spacing: 10 },
    breakpoints: {
      "(max-width: 768px)": {
        slides: { perView: 1, spacing: 10 },
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
            onClick={() => carouselRef.current?.next()}
            type="button"
          >
            <CaretLeft weight="bold" size="45" />
          </LeftButton>

          <RightButton
            className="arrowRight"
            onClick={() => carouselRef.current?.prev()}
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
