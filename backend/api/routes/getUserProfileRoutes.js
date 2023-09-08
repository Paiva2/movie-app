import UserProfileController from "../controllers/userProfilerController.js"
import multer from "multer"

const userProfileController = new UserProfileController()
const upload = multer({ dest: "uploads/" })

const routes = [
  {
    route_for: "Get user profile informations (auth user)",
    path: "/user-profile",
    method: "post",
    handler: userProfileController.getUserInformations,
  },
]

export default function getUserProfileRoutes(app) {
  app.route("/user-profile").patch(upload.array("files"), (req, res) => {
    userProfileController.updateProfilePicture(req, res)
  })

  routes.forEach((route) => {
    app.route(route.path)[route.method]((req, res) => {
      route.handler(req, res)
    })
  })
}
