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
import { useMutation, useQuery, useQueryClient } from "react-query"
import { api } from "../../lib/api"
import { BookmarkSimple } from "@phosphor-icons/react"
import { useState, Fragment, useContext } from "react"
import MovieModal from "../MovieModal"
import { FilmProps } from "../../types"
import { AuthContextProvider } from "../../contexts/AuthContext"

interface BookmarkSchema {
  film: FilmProps
  user: string
  action: string
}

const HomeMiddleSection = () => {
  const { userAuthenticated } = useContext(AuthContextProvider)

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

  const queryClient = useQueryClient()

  const bookMarkFilm = useMutation({
    mutationFn: async (bookmarkSchema: BookmarkSchema) => {
      try {
        const response = await api.patch(
          `/bookmark-movie/action=${bookmarkSchema.action}`,
          {
            data: {
              film: bookmarkSchema.film,
              user: bookmarkSchema.user,
            },
          }
        )

        return response
      } catch (e) {
        console.log("There was an error...")
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getHomeTrendings"] })
    },
  })

  const handleSetBookmark = async (
    filmToBookmark: FilmProps,
    action: "insert" | "remove"
  ) => {
    const bookmarkBody = {
      film: filmToBookmark,
      user: userAuthenticated.userToken,
      action: action,
    }

    try {
      const response = await bookMarkFilm.mutateAsync(bookmarkBody)

      console.log(response)
    } catch (e) {
      console.log(e)
    }
  }

  if (isLoading) return <></>

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
                          onClick={(e) => {
                            e.stopPropagation()

                            handleSetBookmark(film, "insert")
                          }}
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
