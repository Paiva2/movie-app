import express from "express"
import axios from "axios"
import cors from "cors"
import "dotenv/config"
import prisma from "./lib/prisma.js"
import jwt from "jsonwebtoken"
import { routesDistribuition } from "./api/routes/index.js"

const app = express()

const port = 3000

app.use(cors())
app.use(express.json())

routesDistribuition.forEach((route) => {
  route(app)
})

const TmdbOptions = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.BEARER_TMBD}`,
  },
}

/* app.post("/bookmarked-movies", async (req, res) => {
  const { userToken } = req.body.data

  if (!userToken) {
    return res.status(404).send({ message: "User token must be a string." })
  }

  const decodedToken = jwt.verify(userToken, process.env.JWT_SECRET)

  const isUserRegistered = await prisma.user.findUnique({
    where: {
      id: decodedToken.id,
      username: decodedToken.username,
    },
    select: {
      bookmarkedFilms: true,
    },
  })

  if (!isUserRegistered) {
    return res.status(409).send({ message: "User not found." })
  }

  return res
    .status(200)
    .json({ bookmarkedFilms: isUserRegistered.bookmarkedFilms })
}) */

app.post("/bookmarked-preview", async (req, res) => {
  const { bookmarkedInfo } = req.body.data

  const preview = await axios.get(
    `https://api.themoviedb.org/3/${bookmarkedInfo.type}/${bookmarkedInfo.id}/videos`,
    TmdbOptions
  )

  if (preview.data.results.length < 1) {
    return res.status(204).json({ bookmarkedPreview: null })
  }

  const getTrailer = preview.data.results.find(
    (previews) => previews.type === "Trailer"
  )

  if (getTrailer) {
    return res.status(200).json({ bookmarkedPreview: getTrailer.key })
  }

  if (preview.data.results[0].key) {
    return res
      .status(200)
      .json({ bookmarkedPreview: preview.data.results[0].key })
  }
})

app.listen(port, () => {
  console.log(`server on: port localhost:${port}`)
})
