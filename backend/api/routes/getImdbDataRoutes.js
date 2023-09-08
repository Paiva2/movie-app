import { GetDataController } from "../controllers/getDataController.js"

const getData = new GetDataController()

export default function getImdbDataRoutes(app) {
  app.route("/trending-movies").get((req, res) => {
    getData.getAllTypes(req, res)
  })

  app.route("/movies").get((req, res) => {
    getData.getMovies(req, res)
  })

  app.route("/single_page_movies").patch((req, res) => {
    getData.getSinglePageMovies(req, res)
  })

  app.route("/tv-shows").get((req, res) => {
    getData.getTvShows(req, res)
  })

  app.route("/search_data").get((req, res) => {
    getData.getSearchedData(req, res)
  })
}
