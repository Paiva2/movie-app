import authenticationRoutes from "./authenticationRoutes.js"
import getImdbDataRoutes from "./getImdbDataRoutes.js"
import getUserProfileRoutes from "./getUserProfileRoutes.js"

export const routesDistribuition = [
  getUserProfileRoutes,
  getImdbDataRoutes,
  authenticationRoutes,
]
