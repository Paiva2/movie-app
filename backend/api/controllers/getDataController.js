import "dotenv/config"
import GetDataModel from "../models/getDataModel.js"

const getDataModel = new GetDataModel()

export class GetDataController {
  async getAllTypes(_, res) {
    try {
      const response = await getDataModel.fetchAllFilms()

      if (response.status === 200) {
        return res.status(200).send(response.data.results)
      }
    } catch {
      return res.status(500)
    }
  }

  async getMovies(_, res) {
    try {
      const response = await getDataModel.fetchMoviesOrTvShows("movie")

      if (response.status === 200) {
        return res.status(200).send(response.data.results)
      }
    } catch {
      return res.status(500)
    }
  }

  async getTvShows(_, res) {
    try {
      const response = await getDataModel.fetchMoviesOrTvShows("tv")

      if (response.status === 200) {
        return res.status(200).send(response.data.results)
      }
    } catch {
      return res.status(500)
    }
  }

  async getSearchedData(req, res) {
    const searchParameter = req.query.search
    const currentPageParameter = req.query.current_page

    try {
      const requestedData = await getDataModel.fetchForSearchParameter(
        searchParameter,
        currentPageParameter
      )

      return res.status(200).json({ data: requestedData })
    } catch {
      return res.status(404).end()
    }
  }
}
