import {
  BannerWrapper,
  BannersContainer,
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
import { useState } from "react"

type TrendingFilms = Array<{
  id: number
  name: string
  poster_path: string
  first_air_date: string
}>

const HomeMiddleSection = () => {
  const [changeBookmark, setChangeBookmark] = useState(false)

  const { data: trendings, isLoading } = useQuery({
    queryKey: ["getHomeTrendings"],

    queryFn: async () => {
      try {
        const response = await api.get<TrendingFilms>("/trending-movies")

        return response
      } catch (e) {
        console.log("There was an error...")
      }
    },
  })

  if (isLoading) return

  return (
    <HomeMiddleSectionWrapper>
      <RecentlyAddedText>
        <h1>Recently Added</h1>
      </RecentlyAddedText>
      <CarouselWrapper>
        <CarouselComponent>
          {trendings?.data.map((film) => {
            return (
              <BannersContainer key={film.id} className="keen-slider__slide">
                <BannerWrapper>
                  <RecentlyAddedCard>
                    <img
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
              </BannersContainer>
            )
          })}
        </CarouselComponent>
      </CarouselWrapper>
    </HomeMiddleSectionWrapper>
  )
}

export default HomeMiddleSection
