const path = require("path")
require("dotenv").config({ path: path.resolve(__dirname, "./process.env") })

const { default: axios } = require("axios")
const express = require("express")
const app = express()
const port = 3000
const cors = require("cors")
app.use(cors())
app.use(express.json())

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

app.listen(port, () => {
  console.log(`server on: port localhost:${port}`)
})
