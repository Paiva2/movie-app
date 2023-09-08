import AuthenticationController from "../controllers/authenticationController.js"

const authenticationController = new AuthenticationController()

const routes = [
  {
    route_for: "Login user",
    path: "/login",
    method: "post",
    handler: authenticationController.loginUser,
  },

  {
    route_for: "Register a new user",
    path: "/register",
    method: "post",
    handler: authenticationController.registerUser,
  },

  {
    route_for: "Change already registered password",
    path: "/forgot-password",
    method: "patch",
    handler: authenticationController.updateUserPassword,
  },
]

export default function authenticationRoutes(app) {
  routes.forEach((route) => {
    app.route(route.path)[route.method]((req, res) => {
      route.handler(req, res)
    })
  })
}
