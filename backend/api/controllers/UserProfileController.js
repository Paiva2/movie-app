import jwt from "jsonwebtoken"
import GetProfileModel from "../models/UserProfileModel.js"

const getProfileModel = new GetProfileModel()

export default class UserProfileController {
  async getUserInformations(req, res) {
    const { userToken } = req.body.data

    if (!userToken) {
      return res.status(404).send({ message: "User not found." })
    }

    const decodedToken = jwt.verify(userToken, process.env.JWT_SECRET)

    const getUserOnDatabase = await getProfileModel.getProfile(
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

  /*   UpdateProfileInformations(req, res) {
    getProfileModel.updateProfile(req, res)
  } */
}
