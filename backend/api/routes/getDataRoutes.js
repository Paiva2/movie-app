import { GetDataController } from "../controllers/getDataController.js"

const getData = new GetDataController()

export default function getDataRoutes(app) {
  app.route("/trending-movies").get((req, res) => {
    getData.getAllTypes(req, res)
  })

  app.route("/movies").get((req, res) => {
    getData.getMovies(req, res)
  })

  app.route("/tv-shows").get((req, res) => {
    getData.getTvShows(req, res)
  })
}
