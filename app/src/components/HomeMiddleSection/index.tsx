import {
  Banner,
  BannerWrapper,
  BookmarkButton,
  CardOverlay,
  CarouselWrapper,
  HomeMiddleSectionWrapper,
  RecentlyAddedCard,
  RecentlyAddedText,
} from "./styles"
import CarouselComponent from "../CarouselComponent"
import { useQuery } from "react-query"
import { api } from "../../lib/api"
import { BookmarkSimple } from "@phosphor-icons/react"
import { useState, Fragment } from "react"
import MovieModal from "../MovieModal"
import { FilmProps } from "../../types"

const HomeMiddleSection = () => {
  const [changeBookmark, setChangeBookmark] = useState(false)
  const [selectedFilmDescriptions, setSelectedFilmDescriptions] =
    useState<FilmProps>({} as FilmProps)
  const [openMovieModal, setOpenMovieModal] = useState(false)

  const { data: trendings, isLoading } = useQuery({
    queryKey: ["getHomeTrendings"],

    queryFn: async () => {
      try {
        const response = await api.get<FilmProps[]>("/trending-movies")

        return response
      } catch (e) {
        console.log("There was an error...")
      }
    },
  })

  if (isLoading) return

  return (
    <Fragment>
      <HomeMiddleSectionWrapper>
        <RecentlyAddedText>
          <h1>Recently Added</h1>
        </RecentlyAddedText>
        <CarouselWrapper>
          <CarouselComponent>
            {trendings?.data.map((film) => {
              return (
                <Banner key={film.id} className="keen-slider__slide">
                  <BannerWrapper>
                    <RecentlyAddedCard
                      onClick={() => {
                        setSelectedFilmDescriptions(film)
                        setOpenMovieModal(true)
                      }}
                    >
                      <img
                        alt={film.name}
                        src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
                      />
                      <CardOverlay className="card-overlay">
                        <div>
                          <p>{film.name}</p>
                          <p>
                            Release:{" "}
                            {new Date(film.first_air_date).toLocaleDateString(
                              "en-US"
                            )}
                          </p>
                        </div>
                        <BookmarkButton
                          onMouseOver={() => setChangeBookmark(true)}
                          onMouseLeave={() => setChangeBookmark(false)}
                        >
                          <BookmarkSimple
                            weight={changeBookmark ? "fill" : "regular"}
                            color="#fff"
                            size={35}
                          />
                        </BookmarkButton>
                      </CardOverlay>
                    </RecentlyAddedCard>
                  </BannerWrapper>
                </Banner>
              )
            })}
          </CarouselComponent>
        </CarouselWrapper>
      </HomeMiddleSectionWrapper>

      <MovieModal
        openMovieModal={openMovieModal}
        setOpenMovieModal={setOpenMovieModal}
        movieData={selectedFilmDescriptions}
      />
    </Fragment>
  )
}

export default HomeMiddleSection
