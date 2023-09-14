import supertest from "supertest"
import app from "../../../index.js"

const request = supertest(app)

describe("Get IMDB API Trending Movies", () => {
  const endpoint = "/trending-movies"

  it("should get IMDB API trending movies.", async () => {
    const data = {
      currentPage: "1",
    }

    const res = await request.post(endpoint).send({ data })

    expect(res.status).toEqual(200)
    expect(res.body.results.length).toBeGreaterThan(0)
    expect(res.body.page.toString()).toBe(data.currentPage)
  })
})
