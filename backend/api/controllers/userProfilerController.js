import jwt from "jsonwebtoken"
import UserProfileModel from "../models/UserProfileModel.js"
import "dotenv/config"

const userProfileModel = new UserProfileModel()

function decodeUserJwtToken(token, secret) {
  if (!token) return

  return jwt.verify(token, secret)
}

export default class UserProfileController {
  async getUserInformations(req, res) {
    const { userToken } = req.body.data

    if (!userToken) {
      return res.status(404).send({ message: "User not found." })
    }

    const decodedToken = decodeUserJwtToken(userToken, process.env.JWT_SECRET)

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

    const decodeUser = decodeUserJwtToken(userJwt, process.env.JWT_SECRET)

    userProfileModel.updateProfilePicture(req, res, decodeUser)
  }
}
