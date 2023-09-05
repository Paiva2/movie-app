import axios from "axios"

export default class GetDataModel {
  async fetchAllFilms(options, req, res) {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/trending/all/day?language=en-US",
        options
      )

      if (response.status === 200) {
        return res.status(200).send(response.data.results)
      }
    } catch {
      throw new Error("There was an error getting TMDB API Data...")
    }
  }

  async fetchMoviesOrTvShows(options, req, res, typeToFetch) {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/${typeToFetch}`,
        options
      )

      if (response.status === 200) {
        return res.status(200).send(response.data.results)
      }
    } catch {
      throw new Error("There was an error getting TMDB API Data...")
    }
  }
}
