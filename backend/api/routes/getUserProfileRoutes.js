import UserProfileController from "../controllers/userProfilerController.js"
import multer from "multer"

const userProfileController = new UserProfileController()
const upload = multer({ dest: "uploads/" })

export default function getUserProfileRoutes(app) {
  app.route("/user-profile").post((req, res) => {
    userProfileController.getUserInformations(req, res)
  })

  app.route("/user-profile").patch(upload.array("files"), (req, res) => {
    userProfileController.updateProfilePicture(req, res)
  })
}
