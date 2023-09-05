import AuthenticationController from "../controllers/authenticationController.js"

const authenticationController = new AuthenticationController()

export default function authenticationRoutes(app) {
  app.route("/login").post((req, res) => {
    authenticationController.loginUser(req, res)
  })

  app.route("/register").post((req, res) => {
    authenticationController.registerUser(req, res)
  })

  app.route("/forgot-password").patch((req, res) => {
    authenticationController.updateUserPassword(req, res)
  })
}
