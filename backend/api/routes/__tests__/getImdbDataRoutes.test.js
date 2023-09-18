import supertest from "supertest"
import app from "../../../index.js"

const request = supertest(app)

describe("Get IMDB API data", () => {
  const trendingsEndpoint = "/trending-movies"
  const moviesEndpoint = "/movies"
  const moviesPageEndpoint = "/single_page_movies"
  const tvShowsEndpoint = "/tv-shows"
  const tvShowsPageEndpoint = "/single_page_tv-show"
  const searchForDataEndpoint = "/search_data"
  const videoPreviewEndpoint = "/data-video-preview"

  it("should get trending movies.", async () => {
    const data = {
      currentPage: "10",
    }

    const res = await request.post(trendingsEndpoint).send({ data })

    expect(res.status).toEqual(200)
    expect(res.body.results.length).toBeGreaterThan(0)
    expect(res.body.page.toString()).toBe(data.currentPage)
  })

  it("should get movies.", async () => {
    const res = await request.get(moviesEndpoint)

    expect(res.status).toEqual(200)
    expect(res.body.length).toBeGreaterThan(0)
  })

  it("should get movies by pages params.", async () => {
    const data = {
      currentPage: "30",
    }

    const res = await request.patch(moviesPageEndpoint).send({ data })

    expect(res.status).toEqual(200)
    expect(res.body.results.length).toBeGreaterThan(0)
    expect(res.body.page.toString()).toBe(data.currentPage)
  })

  it("should get tv shows.", async () => {
    const res = await request.get(tvShowsEndpoint)

    expect(res.status).toEqual(200)
    expect(res.body.length).toBeGreaterThan(0)
  })

  it("should get tv shows by pages params.", async () => {
    const data = {
      currentPage: "20",
    }

    const res = await request.patch(tvShowsPageEndpoint).send({ data })

    expect(res.status).toEqual(200)
    expect(res.body.results.length).toBeGreaterThan(0)
    expect(res.body.page.toString()).toBe(data.currentPage)
  })

  it("should get a data from API using url parameters to search.", async () => {
    const keyword = "One Piece"
    const currentPage = "4"

    const res = await request.get(
      `${searchForDataEndpoint}/?search=${keyword}?&current_page=${currentPage}`
    )

    expect(res.status).toEqual(200)
    expect(res.body.data.results.length).toBeGreaterThan(0)
    expect(res.body.data.total_results).toBeGreaterThan(0)
    expect(res.body.data.page.toString()).toEqual(currentPage)
    expect(res.req.path).toEqual(
      encodeURI(
        `${searchForDataEndpoint}/?search=${keyword}?&current_page=${currentPage}`
      )
    )
  })

  it("should get video preview from request url parameter.", async () => {
    const data = {
      requestedDataPreviewInfo: {
        id: 46260, // Naruto
        type: "tv",
      },
    }

    const res = await request.post(videoPreviewEndpoint).send({ data })

    expect(res.status).toEqual(200)
    expect(res.body.dataVideoPreview.length).toBeGreaterThan(0)
    expect(res.body.dataVideoPreview).toEqual("-G9BqkgZXRA") // Video preview URL from ID 46260
  })
})
