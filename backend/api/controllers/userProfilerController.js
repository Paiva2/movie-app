import jwt from "jsonwebtoken"
import UserProfileModel from "../models/UserProfileModel.js"

const userProfileModel = new UserProfileModel()

function decodeUserJwtToken(token, secret) {
  if (!token) return

  return jwt.verify(token, secret)
}

export default class UserProfileController {
  #jwtSecret = process.env.JWT_SECRET

  async getUserInformations(req, res) {
    const { userToken } = req.body.data

    if (!userToken) {
      return res.status(404).send({ message: "User not found." })
    }

    const decodedToken = decodeUserJwtToken(userToken, this.#jwtSecret)

    const getUserOnDatabase = await userProfileModel.getProfile(
      req,
      res,
      decodedToken
    )

    const userInformations = {
      id: getUserOnDatabase.id,
      username: getUserOnDatabase.username,
      image: getUserOnDatabase.image,
    }

    return res.status(200).json({ data: userInformations })
  }

  async updateProfilePicture(req, res) {
    const userJwt = req.query.userKey

    const decodeUser = decodeUserJwtToken(userJwt, this.#jwtSecret)

    userProfileModel.updateProfilePicture(req, res, decodeUser)
  }
}
