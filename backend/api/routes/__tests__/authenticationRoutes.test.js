import app from "../../../index.js"
import supertest from "supertest"
import bcrypt from "bcrypt"
import prismaMock from "../../../singleton"
import AuthenticationModel from "../../models/authenticationModel"
import { jest } from "@jest/globals"

const request = supertest(app)
const authModel = new AuthenticationModel()

prismaMock.user.findFirst = jest.fn()
prismaMock.user.create = jest.fn()
prismaMock.user.update = jest.fn()

function encryptPassword(saltRounds = 10, data) {
  const passwordToHash = data
  const hashedPassword = bcrypt.hashSync(passwordToHash, saltRounds)

  return hashedPassword
}

describe("Register a new user", () => {
  const endpoint = "/register"

  it("should throw 404 error if username is empty.", async () => {
    const data = {
      data: {
        username: "",
        password: "123456",
      },
    }

    const res = await request.post(endpoint).send(data)
    expect(res.status).toEqual(404)
    expect(res.body.message).toBe("Username or Password can't be empty.")
  })

  it("should throw 404 error if password is empty.", async () => {
    const data = {
      data: {
        username: "test",
        password: "",
      },
    }

    const res = await request.post(endpoint).send(data)

    expect(res.status).toEqual(404)
    expect(res.body.message).toBe("Username or Password can't be empty.")
  })

  it("should throw 404 error if password is less than 5 characters.", async () => {
    const data = {
      data: { username: "test", password: "1234" },
    }

    const res = await request.post(endpoint).send(data)

    expect(res.status).toEqual(404)
    expect(res.body.message).toBe("Password must have at least 5 characters.")
  })

  it("should throw 409 error if user is already registered.", async () => {
    const user = {
      username: "test-user",
      password: "12345",
    }

    prismaMock.user.findFirst.mockResolvedValue(user)

    await expect(authModel.checkIfUserExists(user.username)).resolves.toEqual(
      user
    )

    const res = await request.post(endpoint).send({ data: user })

    expect(res.status).toEqual(409)
    expect(res.body.message).toBe("Username already exists.")
  })

  it("should successfully create a new user.", async () => {
    const initialUserData = {
      username: "test-user",
      password: "123456",
    }

    const hashedPassword = encryptPassword(10, initialUserData.password)

    expect(typeof hashedPassword).toBe("string")
    expect(hashedPassword.length).toEqual(60)

    const finalUser = {
      id: 1,
      username: "test-user",
      password: hashedPassword,
      image: "https://i.postimg.cc/XvrwMSKy/transferir.jpg",
    }

    prismaMock.user.create.mockResolvedValue({
      data: finalUser,
    })

    const res = await request.post(endpoint).send({ data: initialUserData })

    await expect(
      authModel.submitRegisterToDatabase(finalUser.username, finalUser.password)
    ).resolves.toEqual()

    expect(res.status).toEqual(201)
    expect(res.body.message).toBe("User created with success!")
  })
})

describe("Login an user with credentials", () => {
  it("should throw 404 error if username is empty.", async () => {
    const endpoint = "/login"
    const data = {
      data: {
        username: "",
        password: "12345",
      },
    }

    const res = await request.post(endpoint).send(data)

    expect(res.status).toEqual(404)
    expect(res.body.message).toBe("Username or Password can't be empty.")
  })

  it("should throw 404 error if password is empty.", async () => {
    const endpoint = "/login"
    const data = {
      data: {
        username: "test",
        password: "",
      },
    }

    const res = await request.post(endpoint).send(data)

    expect(res.status).toEqual(404)
    expect(res.body.message).toBe("Username or Password can't be empty.")
  })
})

describe("Update registered user password.", () => {
  const endpoint = "/forgot-password"

  it("should throw 404 error if username is empty.", async () => {
    const data = {
      data: {
        username: "",
        password: "12345",
      },
    }

    const res = await request.patch(endpoint).send(data)

    expect(res.status).toEqual(404)
    expect(res.body.message).toBe("Username or Password can't be empty.")
  })

  it("should throw 404 error if password is empty.", async () => {
    const data = {
      data: {
        username: "test",
        password: "",
      },
    }

    const res = await request.patch(endpoint).send(data)

    expect(res.status).toEqual(404)
    expect(res.body.message).toBe("Username or Password can't be empty.")
  })

  it("should throw 404 error if user is not registered on database.", async () => {
    const data = {
      username: "test",
      password: "12345",
    }

    prismaMock.user.findFirst.mockResolvedValue(null)

    await expect(authModel.checkIfUserExists(data.username)).resolves.toBe(null)

    const res = await request.patch(endpoint).send({ data })

    expect(res.status).toBe(404)
    expect(res.body.message).toBe("User not found.")
  })

  it("should successfully change user password.", async () => {
    const data = {
      username: "test",
      password: "12345",
    }

    const userOnDatabase = {
      ...data,
      id: 1,
      image: "https://i.postimg.cc/XvrwMSKy/transferir.jpg",
    }

    prismaMock.user.findFirst.mockResolvedValue(userOnDatabase)

    await expect(authModel.checkIfUserExists(data.username)).resolves.toBe(
      userOnDatabase
    )

    const hashedPassword = encryptPassword(10, data.password)

    expect(typeof hashedPassword).toBe("string")
    expect(hashedPassword.length).toEqual(60)

    prismaMock.user.update.mockResolvedValue(undefined)

    await expect(
      authModel.submitUserPasswordChange(data.username, hashedPassword)
    ).resolves.toBe(undefined)

    const res = await request
      .patch(endpoint)
      .send({ data: { username: data.username, password: hashedPassword } })

    expect(res.status).toBe(200)
    expect(res.body.message).toBe("Password updated with success!")
  })
})
