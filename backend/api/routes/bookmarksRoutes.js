import BookmarkedsController from "../controllers/bookmarkedsController.js"

const bookmarkedsController = new BookmarkedsController()

const routes = [
  {
    route_for: "Bookmark a new movie or tv show over a condition",
    path: "/bookmark-movie/?:action",
    method: "patch",
    handler: bookmarkedsController.handleBookmarkedOnAccount,
  },

  {
    route_for: "Get all user bookmarkeds",
    path: "/bookmarked-movies",
    method: "post",
    handler: bookmarkedsController.getUserBookmarkeds,
  },
]

export default function bookmarksRoutes(app) {
  routes.forEach((route) => {
    app.route(route.path)[route.method]((req, res) => {
      route.handler(req, res)
    })
  })
}
