import UserProfileController from "../controllers/UserProfileController.js"

const userProfileController = new UserProfileController()

export default function getUserProfileRoutes(app) {
  app.route("/user-profile").post((req, res) => {
    userProfileController.getUserInformations(req, res)
  })

  app.route("/user-profile").patch((req, res) => {
    userProfileController.UpdateProfileInformations(req, res)
  })
}
