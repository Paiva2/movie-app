import React, { useState } from "react"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import {
  ArrowsContainer,
  CarouselContainer,
  LeftButton,
  RightButton,
} from "./styles"
import { CaretLeft, CaretRight } from "@phosphor-icons/react"

const CarouselComponent = ({ children }: { children: React.ReactNode }) => {
  const [_, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    rtl: true,
    breakpoints: {
      "(min-width: 1000px)": {
        slides: { perView: 9, spacing: 10 },
      },
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
  })

  return (
    <>
      <CarouselContainer ref={sliderRef} className="keen-slider">
        {children}
      </CarouselContainer>
      {loaded && instanceRef.current && (
        <ArrowsContainer>
          <LeftButton onClick={() => instanceRef.current?.next()} type="button">
            <CaretLeft weight="bold" size="45" />
          </LeftButton>

          <RightButton
            onClick={() => instanceRef.current?.prev()}
            type="button"
          >
            <CaretRight weight="bold" size="45" />
          </RightButton>
        </ArrowsContainer>
      )}
    </>
  )
}

export default CarouselComponent
