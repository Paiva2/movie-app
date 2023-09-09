import app from "../../../index.js"
import supertest from "supertest"

import prismaMock from "../../../singleton"
import AuthenticationModel from "../../models/authenticationModel"
import { jest } from "@jest/globals"
const request = supertest(app)
const authModel = new AuthenticationModel()

prismaMock.user.findFirst = jest.fn()
prismaMock.user.create = jest.fn()

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

    await expect(authModel.checkIfUserExists(user)).resolves.toEqual(user)

    const res = await request.post(endpoint).send({ data: user })

    expect(res.status).toEqual(409)
    expect(res.body.message).toBe("Username already exists.")
  })

  it("should successfully create a new user.", async () => {
    const initialUserData = {
      username: "test-user",
      password: "123456",
    }

    const finalUser = {
      id: 1,
      username: "test-user",
      password: "$6c$90$6IavfzCQu2eYVL1nAqXnte1qbg00lFBiAdgDXYy8WHr2L6jhS922c",
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
  it("should throw 404 error if username is empty.", async () => {
    const endpoint = "/forgot-password"
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
    const endpoint = "/forgot-password"
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
})
