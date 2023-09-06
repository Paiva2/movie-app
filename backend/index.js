import express from "express"
import cors from "cors"
import { routesDistribuition } from "./api/routes/index.js"

const app = express()

const port = 3000

app.use(cors())
app.use(express.json())

routesDistribuition.forEach((route) => {
  route(app)
})

app.listen(port, () => {
  console.log(`server on: port ${port}`)
})
