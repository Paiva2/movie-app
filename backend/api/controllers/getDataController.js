import "dotenv/config"
import GetDataModel from "../models/getDataModel.js"

const getDataModel = new GetDataModel()

export class GetDataController {
  async getAllTypes(req, res) {
    let currentPage

    if (req?.body.data) {
      currentPage = req?.body.data.currentPage
    }

    try {
      const response = await getDataModel.fetchAllFilms(currentPage)

      return res.status(200).send(response)
    } catch {
      return res.status(500).end()
    }
  }

  async getMovies(_, res) {
    try {
      const response = await getDataModel.fetchMoviesOrTvShowsForHome("movie")

      if (response.status === 200) {
        return res.status(200).send(response.data.results)
      }
    } catch {
      return res.status(500)
    }
  }

  async getSinglePageMovies(req, res) {
    const page = req.body.data

    try {
      const response = await getDataModel.fetchMoviesOrTvShowsForSinglePage(
        "movie",
        page
      )

      return res.status(200).send(response)
    } catch {
      return res.status(500)
    }
  }

  async getSinglePageTvShow(req, res) {
    const page = req.body.data

    try {
      const response = await getDataModel.fetchMoviesOrTvShowsForSinglePage(
        "tv",
        page
      )

      return res.status(200).send(response)
    } catch {
      return res.status(500)
    }
  }

  async getTvShows(_, res) {
    try {
      const response = await getDataModel.fetchMoviesOrTvShowsForHome("tv")

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

  async getDataVideoPreview(req, res) {
    const { requestedDataPreviewInfo } = req.body.data

    try {
      const preview = await getDataModel.fetchDataVideoPreview(
        requestedDataPreviewInfo
      )

      if (preview.data.results.length < 1) {
        return res.status(204).json({ dataVideoPreview: null })
      }

      const getTrailer = preview.data.results.find(
        (previews) => previews.type === "Trailer"
      )

      if (getTrailer) {
        return res.status(200).json({ dataVideoPreview: getTrailer.key })
      }

      if (preview.data.results[0].key) {
        return res
          .status(200)
          .json({ dataVideoPreview: preview.data.results[0].key })
      }
    } catch {
      return res.status(500)
    }
  }
}
