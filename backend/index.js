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

app.patch("/bookmark-movie/?:action", async (req, res) => {
  const { movie, user: userToken, film, category } = req.body.data

  if (movie) {
    return res.status(404).send({ message: "Movie must be a string." })
  }

  if (!userToken) {
    return res.status(404).send({ message: "User token must be a string." })
  }

  if (!film) {
    return res.status(404).send({ message: "Film must be a string." })
  }

  const decodedToken = jwt.verify(userToken, process.env.JWT_SECRET)

  const isUserRegistered = await prisma.user.findUnique({
    where: {
      id: decodedToken.id,
      username: decodedToken.username,
    },
  })

  if (!isUserRegistered) {
    return res.status(409).send({ message: "User not found." })
  }

  const filmToPerformAction = {
    filmId: film.id.toString(),
    title: film.name,
    poster: film.poster_path,
    overview: film.overview,
    first_air_date: film.first_air_date,
    backdrop_path: film.backdrop_path,
    userId: isUserRegistered.id,
    mediaType: category,
  }

  switch (req.params.action) {
    case "action=insert":
      await prisma.bookmarkedFilms.create({
        data: filmToPerformAction,
      })

      return res.status(201).send({ message: "Film bookmarked with success!" })
    case "action=remove":
      const bookmarkToDelete = await prisma.bookmarkedFilms.findFirst({
        where: {
          filmId: film.id.toString(),
          userId: isUserRegistered.id,
        },
      })

      await prisma.bookmarkedFilms.delete({
        where: {
          id: bookmarkToDelete.id,
          AND: {
            userId: isUserRegistered.id,
          },
        },
      })
      return res
        .status(200)
        .send({ message: "Film removed from bookmarked list with success!" })
    default:
      return null
  }
})

app.post("/bookmarked-movies", async (req, res) => {
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
})

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
