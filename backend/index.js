import express from "express"
import axios from "axios"
import bcrypt from "bcrypt"
import cors from "cors"
import "dotenv/config"
import prisma from "./lib/prisma.js"
import jwt from "jsonwebtoken"

const app = express()

const port = 3000

app.use(cors())
app.use(express.json())

function encryptPassword(saltRounds = 10, data) {
  const passwordToHash = data
  const hashedPassword = bcrypt.hashSync(passwordToHash, saltRounds)

  return hashedPassword
}

const TmdbOptions = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.BEARER_TMBD}`,
  },
}

app.post("/user-profile", async (req, res) => {
  const { userToken } = req.body.data

  if (typeof userToken !== "string") {
    return res.status(404).send({ message: "User not found." })
  }

  const decodedToken = jwt.verify(userToken, process.env.JWT_SECRET)

  const user = await prisma.user.findUnique({
    where: {
      id: decodedToken.id,
      username: decodedToken.username,
    },
  })

  if (!user) {
    return res.status(404).send({ message: "User not found." })
  }

  const userInformations = {
    id: user.id,
    username: user.username,
    image: user.image,
  }

  return res.status(200).json({ data: userInformations })
})

app.get("/all-films", async (_, res) => {
  const response = await axios.get(
    "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1",
    TmdbOptions
  )

  return res.status(200).send(response.data)
})

app.get("/trending-movies", async (_, res) => {
  const response = await axios.get(
    "https://api.themoviedb.org/3/trending/tv/day?language=en-US",
    TmdbOptions
  )

  return res.status(200).send(response.data.results)
})

app.get("/movies", async (_, res) => {
  const response = await axios.get(
    "https://api.themoviedb.org/3/discover/movie",
    TmdbOptions
  )

  return res.status(200).send(response.data.results)
})

app.get("/tv-shows", async (_, res) => {
  const response = await axios.get(
    "https://api.themoviedb.org/3/discover/tv",
    TmdbOptions
  )

  return res.status(200).send(response.data.results)
})

app.post("/login", async (req, res) => {
  if (typeof req.body.data.username !== "string") {
    return res.status(404).send({ message: "Username must be a string." })
  }

  if (typeof req.body.data.password !== "string") {
    return res.status(404).send("Password must be a string.")
  }

  if (!req.body.data.username) {
    return res
      .status(404)
      .send({ message: "Username or Password can't be empty." })
  } else if (!req.body.data.password) {
    return res
      .status(404)
      .send({ message: "Username or Password can't be empty." })
  }

  const isUserRegistered = await prisma.user.findUnique({
    where: {
      username: req.body.data.username,
    },
  })

  if (!isUserRegistered) {
    return res.status(409).send({ message: "Username not found!" })
  }

  const checkIfPasswordsMatch = bcrypt.compareSync(
    req.body.data.password,
    isUserRegistered.password
  )

  if (!checkIfPasswordsMatch) {
    return res.status(409).send({ message: "Wrong credentials!" })
  }

  const userInformationsToJwt = {
    id: isUserRegistered.id,
    username: isUserRegistered.username,
  }

  jwt.sign(userInformationsToJwt, process.env.JWT_SECRET, (err, token) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error while generating new JWT. Try again later." })
    }

    return res
      .status(200)
      .send({ message: "Authentication success.", token: token })
  })
})

app.post("/register", async (req, res) => {
  if (typeof req.body.data.username !== "string") {
    return res.status(404).send({ message: "Username must be a string." })
  }

  if (typeof req.body.data.password !== "string") {
    return res.status(404).send({ message: "Password must be a string." })
  }

  if (!req.body.data.username) {
    return res
      .status(404)
      .send({ message: "Username or Password can't be empty." })
  } else if (!req.body.data.password) {
    return res
      .status(404)
      .send({ message: "Password or Password can't be empty." })
  } else if (req.body.data.password.length < 5) {
    return res
      .status(404)
      .send({ message: "Password must have at least 5 characters." })
  }

  const isUserRegistered = await prisma.user.findUnique({
    where: {
      username: req.body.data.username,
    },
  })

  if (isUserRegistered) {
    return res.status(409).send({ message: "Username already exists." })
  }

  const hashedPassword = encryptPassword(10, req.body.data.password)

  await prisma.user.create({
    data: {
      username: req.body.data.username,
      password: hashedPassword,
      image:
        req.body.data.image ?? "https://i.postimg.cc/XvrwMSKy/transferir.jpg",
    },
  })

  return res.status(201).send({ message: "User created with success!" })
})

app.patch("/forgot-password", async (req, res) => {
  if (typeof req.body.data.username !== "string") {
    return res.status(404).send({ message: "Username must be a string." })
  }

  if (typeof req.body.data.password !== "string") {
    return res.status(404).send({ message: "Password must be a string." })
  }

  if (!req.body.data.username) {
    return res
      .status(404)
      .send({ message: "Username or Password can't be empty." })
  } else if (!req.body.data.password) {
    return res
      .status(404)
      .send({ message: "Password or Password can't be empty." })
  } else if (req.body.data.password.length < 5) {
    return res
      .status(404)
      .send({ message: "Password must have at least 5 characters." })
  }

  const isUserRegistered = await prisma.user.findUnique({
    where: {
      username: req.body.data.username,
    },
  })

  if (!isUserRegistered) {
    return res.status(409).send({ message: "Username not found." })
  }

  const hashedPassword = encryptPassword(10, req.body.data.password)

  await prisma.user.update({
    where: {
      id: isUserRegistered.id,
    },
    data: {
      password: hashedPassword,
    },
  })

  return res.status(200).send({ message: "Password updated with success!" })
})

app.patch("/bookmark-movie/?:action", async (req, res) => {
  const { movie, user: userToken, film } = req.body.data

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
  }

  switch (req.params.action) {
    case "action=insert":
      await prisma.bookmarkedFilms.create({
        data: filmToPerformAction,
      })

      return res.status(201).send({ message: "Film bookmarked with success!" })
    case "action=remove":
      await prisma.bookmarkedFilms.delete({
        where: {
          filmId: film.id.toString(),
        },
      })
      return res
        .status(200)
        .send({ message: "Film removed from bookmarked list with success!" })
      break
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

app.listen(port, () => {
  console.log(`server on: port localhost:${port}`)
})
