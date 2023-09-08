import { GetDataController } from "../controllers/getDataController.js"

const getData = new GetDataController()

const routes = [
  {
    route_for: "Trending Movies",
    path: "/trending-movies",
    method: "get",
    handler: getData.getAllTypes,
  },

  {
    route_for: "Carousel Movies",
    path: "/movies",
    method: "get",
    handler: getData.getMovies,
  },

  {
    route_for: "Movies on single page movies",
    path: "/single_page_movies",
    method: "patch",
    handler: getData.getSinglePageMovies,
  },

  {
    route_for: "Tv shows Carousel",
    path: "/tv-shows",
    method: "get",
    handler: getData.getTvShows,
  },

  {
    route_for: "Tv shows on single page movies",
    path: "/single_page_tv-show",
    method: "patch",
    handler: getData.getSinglePageTvShow,
  },

  {
    route_for: "Searched movie or tv show",
    path: "/search_data",
    method: "get",
    handler: getData.getSearchedData,
  },

  {
    route_for: "Get a movie or tv show video preview",
    path: "/data-video-preview",
    method: "post",
    handler: getData.getDataVideoPreview,
  },
]

export default function getImdbDataRoutes(app) {
  routes.forEach((route) => {
    app.route(route.path)[route.method]((req, res) => {
      route.handler(req, res)
    })
  })
}
