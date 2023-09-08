import axios from "axios"

export default class GetDataModel {
  #tmdbOptions = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.BEARER_TMBD}`,
    },
  }

  async fetchAllFilms() {
    const response = await axios.get(
      "https://api.themoviedb.org/3/trending/all/day?language=en-US",
      this.#tmdbOptions
    )

    return response
  }

  async fetchMoviesOrTvShowsForHome(typeToFetch) {
    const response = await axios.get(
      `https://api.themoviedb.org/3/trending/${typeToFetch}/week?&language=en-US`,
      this.#tmdbOptions
    )

    return response
  }

  async fetchMoviesOrTvShowsForSinglePage(typeToFetch, currentPage = "1") {
    const response = await axios.get(
      `https://api.themoviedb.org/3/trending/${typeToFetch}/week?&page=${currentPage}&language=en-US`,
      this.#tmdbOptions
    )

    return response.data
  }

  async fetchForSearchParameter(parameterToSearch, currentPage = "1") {
    const url = `https://api.themoviedb.org/3/search/multi?query=${parameterToSearch}&include_adult=false&language=en-US&page=${currentPage}`

    try {
      const { data } = await axios.get(url, this.#tmdbOptions)

      return data
    } catch {
      throw new Error("Error while searching for requested data...")
    }
  }

  async fetchDataVideoPreview(bookmarkedInfo) {
    const preview = await axios.get(
      `https://api.themoviedb.org/3/${bookmarkedInfo.type}/${bookmarkedInfo.id}/videos`,
      this.#tmdbOptions
    )

    return preview
  }
}
