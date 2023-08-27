import express from "express"
import axios from "axios"
import bcrypt from "bcrypt"
import cors from "cors"
import "dotenv/config"
import prisma from "./lib/prisma.js"

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

app.post("/register", async (req, res) => {
  if (!req.body.data.username) {
    if (typeof req.body.data.username !== "string") {
      return res.status(404).send("Username must be a string.")
    }

    return res.status(404).send("Username or Password can't be empty.")
  } else if (!req.body.data.password) {
    if (typeof req.body.data.password !== "string") {
      return res.status(404).send("Password must be a string.")
    }

    return res.status(404).send("Password or Password can't be empty.")
  }

  const isUserRegistered = await prisma.user.findUnique({
    where: {
      username: req.body.data.username,
    },
  })

  if (isUserRegistered) {
    return res.status(409).send("Username already exists.")
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

  return res.status(201).send("User created with success!")
})

app.listen(port, () => {
  console.log(`server on: port localhost:${port}`)
})
