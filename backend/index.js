import express from "express"
import cors from "cors"
import { routesDistribuition } from "./api/routes/index.js"

const app = express()

app.use(cors())
app.use(express.json())

routesDistribuition.forEach((route) => {
  route(app)
})

app.listen(3000, () => {
  console.log(`server on`)
})

export default app
