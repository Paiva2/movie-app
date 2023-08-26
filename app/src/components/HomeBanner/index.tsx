import React from "react"
import {
  Banner,
  BannerButtons,
  BannerButtonsContainer,
  BannerContainer,
  BannerOverlay,
  BannerTitle,
} from "./styles"

const HomeBanner = () => {
  return (
    <BannerContainer>
      <Banner
        alt="Home Banner"
        src="https://images7.alphacoders.com/118/1188302.jpg"
      />

      <BannerOverlay>
        <BannerTitle>
          <span>
            <p>
              LEAGUE OF LEGENDS
              <br /> ARCANE
            </p>
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
        </BannerTitle>
      </BannerOverlay>
    </BannerContainer>
  )
}

export default HomeBanner
