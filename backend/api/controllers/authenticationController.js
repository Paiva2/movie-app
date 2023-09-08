import AuthenticationModel from "../models/authenticationModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import "dotenv/config"

function encryptPassword(saltRounds = 10, data) {
  const passwordToHash = data
  const hashedPassword = bcrypt.hashSync(passwordToHash, saltRounds)

  return hashedPassword
}

const authenticationModel = new AuthenticationModel()

export default class AuthenticationController {
  async loginUser(req, res) {
    const { username, password } = req.body.data

    if (!username || !password) {
      return res
        .status(404)
        .send({ message: "Username or Password can't be empty." })
    }

    const userInformations =
      await authenticationModel.submitAuthenticationToDatabase(username)

    if (!userInformations) {
      return res.status(404).send({ message: "User not found." })
    }

    const checkIfPasswordsMatch = bcrypt.compareSync(
      password,
      userInformations.password
    )

    if (!checkIfPasswordsMatch) {
      return res.status(401).send({ message: "Wrong credentials!" })
    }

    const userInformationsToJwt = {
      username: userInformations.username,
      password: userInformations.password,
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
  }

  async registerUser(req, res) {
    const { username, password } = req.body.data

    if (!username || !password) {
      return res
        .status(404)
        .send({ message: "Username or Password can't be empty." })
    } else if (password.length < 5) {
      return res
        .status(404)
        .send({ message: "Password must have at least 5 characters." })
    }

    const isUserRegistered = await authenticationModel.checkIfUserExists(
      username
    )

    if (isUserRegistered) {
      return res.status(409).send({ message: "Username already exists." })
    }

    const hashedPassword = encryptPassword(10, password)

    try {
      await authenticationModel.submitRegisterToDatabase(
        username,
        hashedPassword
      )

      return res.status(201).send({ message: "User created with success!" })
    } catch (error) {
      return res
        .status(500)
        .send({ message: "Error while creating a new user, try again later." })
    }
  }

  async updateUserPassword(req, res) {
    const { username, password } = req.body.data

    if (!username || !password) {
      return res
        .status(409)
        .send({ message: "Username or password can't be empty." })
    }

    const isUserRegistered = await authenticationModel.checkIfUserExists(
      username
    )

    if (!isUserRegistered) {
      return res.status(404).send({ message: "User not found." })
    }

    const hashedPassword = encryptPassword(10, password)

    try {
      await authenticationModel.submitUserPasswordChange(
        username,
        hashedPassword
      )

      return res.status(200).send({ message: "Password updated with success!" })
    } catch {
      return res
        .status(500)
        .end({ message: "There was an error. Try again later." })
    }
  }
}
