import "dotenv/config"
import GetDataModel from "../models/getDataModel.js"

const TmdbOptions = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.BEARER_TMBD}`,
  },
}

const getDataModel = new GetDataModel()

export class GetDataController {
  getAllTypes(req, res) {
    getDataModel.fetchAllFilms(TmdbOptions, req, res)
  }

  getMovies(req, res) {
    getDataModel.fetchMoviesOrTvShows(TmdbOptions, req, res, "movie")
  }

  getTvShows(req, res) {
    getDataModel.fetchMoviesOrTvShows(TmdbOptions, req, res, "tv")
  }
}
