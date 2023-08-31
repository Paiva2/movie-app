import { HomeMiddleSectionWrapper, SectionTitle } from "./styles"
import { Fragment } from "react"
import MovieModal from "../MovieModal"
import MoviesCarousel from "../MoviesCarousel"
import TrendingsCarousel from "../TrendingsCarousel"

const HomeMiddleSection = () => {
  return (
    <Fragment>
      <HomeMiddleSectionWrapper>
        <SectionTitle>
          <h1>Trending</h1>
        </SectionTitle>
        <TrendingsCarousel />

        <SectionTitle>
          <h1>MOVIES</h1>
        </SectionTitle>
        <MoviesCarousel />
      </HomeMiddleSectionWrapper>

      <MovieModal />
    </Fragment>
  )
}

export default HomeMiddleSection
