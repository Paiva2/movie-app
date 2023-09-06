import BookmarkedsController from "../controllers/bookmarkedsController.js"

const bookmarkedsController = new BookmarkedsController()

export default function bookmarksRoutes(app) {
  app.route("/bookmark-movie/?:action").patch((req, res) => {
    bookmarkedsController.handleBookmarkedOnAccount(req, res)
  })

  app.route("/bookmarked-movies").post((req, res) => {
    bookmarkedsController.getUserBookmarkeds(req, res)
  })

  app.route("/bookmarked-preview").post((req, res) => {
    bookmarkedsController.getBookmarkedPreview(req, res)
  })
}
