import BookmarkedsModel from "../models/bookmarkedsModel.js"
import jwt from "jsonwebtoken"

const bookmarkedsModel = new BookmarkedsModel()

export default class BookmarkedsController {
  #jwtSecret = process.env.JWT_SECRET

  async handleBookmarkedOnAccount(req, res) {
    const { dataInfos, user: userToken, category } = req.body.data

    if (!userToken) {
      return res.status(404).send({ message: "Invalid user token." })
    }

    if (!dataInfos) {
      return res.status(404).send({ message: "Invalid data informations." })
    }

    const decodedToken = jwt.verify(userToken, this.#jwtSecret)

    const isUserRegistered = await bookmarkedsModel.checkIfUserExists(
      decodedToken
    )

    if (!isUserRegistered) {
      return res.status(409).send({ message: "User not found." })
    }

    const filmToPerformAction = {
      filmId: dataInfos.id.toString(),
      title: dataInfos.name,
      poster: dataInfos.poster_path,
      overview: dataInfos.overview,
      first_air_date: dataInfos.first_air_date,
      backdrop_path: dataInfos.backdrop_path,
      userId: isUserRegistered.id,
      mediaType: category,
    }

    switch (req.params.action) {
      case "action=insert":
        try {
          await bookmarkedsModel.insertBookmarked(filmToPerformAction)

          return res
            .status(201)
            .send({ message: "Film bookmarked with success!" })
        } catch {
          return res.status(500).end()
        }

      case "action=remove":
        try {
          await bookmarkedsModel.removeBookmarked(
            dataInfos,
            isUserRegistered.id
          )

          return res.status(200).send({
            message: "Film removed from bookmarked list with success!",
          })
        } catch {
          return res.status(500).end()
        }

      default:
        return res.status(500).end()
    }
  }

  async getUserBookmarkeds(req, res) {
    const { userToken } = req.body.data

    if (!userToken) {
      return res.status(404).end()
    }

    const decodedToken = jwt.verify(userToken, this.#jwtSecret)

    const userInformations =
      await bookmarkedsModel.getUserBookmarkedsOnDatabase(decodedToken)

    if (!userInformations) {
      return res.status(409).end()
    }

    return res
      .status(200)
      .json({ bookmarkedFilms: userInformations.bookmarkedFilms })
  }
}
