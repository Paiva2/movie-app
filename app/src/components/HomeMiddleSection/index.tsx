import { HomeMiddleSectionWrapper, SectionTitle } from "./styles"
import { Fragment } from "react"
import MovieModal from "../MovieModal"
import MoviesCarousel from "../MoviesCarousel"
import TrendingsCarousel from "../TrendingsCarousel"
import TvShowsCarousel from "../TvShowsCarousel"

const HomeMiddleSection = () => {
  return (
    <Fragment>
      <HomeMiddleSectionWrapper>
        <SectionTitle>
          <h1>Trending</h1>
        </SectionTitle>
        <TrendingsCarousel />

        <SectionTitle>
          <h1>Movies</h1>
        </SectionTitle>
        <MoviesCarousel />

        <SectionTitle>
          <h1>Tv shows</h1>
        </SectionTitle>
        <TvShowsCarousel />
      </HomeMiddleSectionWrapper>

      <MovieModal />
    </Fragment>
  )
}

export default HomeMiddleSection
