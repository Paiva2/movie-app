import app from "../../../index.js"
import supertest from "supertest"
const request = supertest(app)

describe("Register a new user", () => {
  it("should throw 404 error if username is empty.", async () => {
    const endpoint = "/register"
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
    const endpoint = "/register"
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
    const endpoint = "/register"
    const data = {
      data: { username: "test", password: "1234" },
    }

    const res = await request.post(endpoint).send(data)

    expect(res.status).toEqual(404)
    expect(res.body.message).toBe("Password must have at least 5 characters.")
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
