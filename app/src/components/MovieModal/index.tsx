import { FilmProps } from "../../types"
import {
  BannerButtons,
  BannerButtonsContainer,
  FilmTexts,
  ModalContainer,
  ModalFilmBackground,
  ModalFilmDescriptions,
  ModalOverlay,
} from "./styles"

interface ModalProps {
  movieData: FilmProps
  openMovieModal: boolean
  setOpenMovieModal: React.Dispatch<React.SetStateAction<boolean>>
}

const MovieModal = ({
  movieData,
  openMovieModal,
  setOpenMovieModal,
}: ModalProps) => {
  return (
    <ModalOverlay
      $visibility={openMovieModal}
      onClick={() => setOpenMovieModal(false)}
    >
      <ModalContainer
        onClick={(e) => e.stopPropagation()}
        $visibility={openMovieModal}
      >
        <ModalFilmDescriptions>
          <span>
            <img
              src={`https://image.tmdb.org/t/p/w500${movieData?.poster_path}`}
            />
          </span>

          <FilmTexts>
            <span>
              <h1>{movieData.name}</h1>
              <p>{movieData.overview}</p>
            </span>

            <BannerButtonsContainer>
              <BannerButtons
                $bgHover="#8976d6"
                $fontColor="#fff"
                $bg="#7c5dfa"
                type="button"
              >
                Watch now
              </BannerButtons>
              <BannerButtons $bgHover="#d1d1d1" $bg="#fff" type="button">
                Add to list
              </BannerButtons>
            </BannerButtonsContainer>
          </FilmTexts>
        </ModalFilmDescriptions>

        <ModalFilmBackground
          $bgImage={`https://image.tmdb.org/t/p/w500${movieData?.backdrop_path}`}
        />
      </ModalContainer>
    </ModalOverlay>
  )
}

export default MovieModal
