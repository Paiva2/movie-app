import axios from "axios"
import MockAdapter from "axios-mock-adapter"
import jest from "jest-mock"
const mock = new MockAdapter(axios)

describe("Register a new user", () => {
  it("should throw 404 error if username is empty.", async () => {
    const invalidUsername = { data: { username: "", password: "123" } }
    const url = "/register"
    const errorMessage = "Username or Password can't be empty."

    let spyMPost = jest.spyOn(axios, "post")

    mock.onPost(url, invalidUsername).replyOnce(404, { message: errorMessage })

    try {
      await axios.post(url, invalidUsername)
    } catch (error) {
      expect(error.response.status).toBe(404)
      expect(error.response.data.message).toBe(errorMessage)
    }

    expect(spyMPost).toHaveBeenCalledWith(url, invalidUsername)
  })

  it("should throw 404 error if password is empty.", async () => {
    const invalidUsername = { data: { username: "test", password: "" } }
    const url = "/register"
    const errorMessage = "Username or Password can't be empty."

    let spyMPost = jest.spyOn(axios, "post")

    mock.onPost(url, invalidUsername).replyOnce(404, { message: errorMessage })

    try {
      await axios.post(url, invalidUsername)
    } catch (error) {
      expect(error.response.status).toBe(404)
      expect(error.response.data.message).toBe(errorMessage)
    }

    expect(spyMPost).toHaveBeenCalledWith(url, invalidUsername)
  })

  it("should throw 404 error if password is less than 5 characters.", async () => {
    const invalidPassword = { data: { username: "test", password: "1234" } }
    const url = "/register"
    const errorMessage = "Password must have at least 5 characters."
    let spyMPost = jest.spyOn(axios, "post")

    mock.onPost(url, invalidPassword).replyOnce(404, { message: errorMessage })

    try {
      await axios.post(url, invalidPassword)
    } catch (error) {
      expect(error.response.status).toBe(404)
      expect(error.response.data.message).toBe(errorMessage)
    }

    expect(spyMPost).toHaveBeenCalledWith(url, invalidPassword)
  })
})

describe("Login an user with credentials", () => {
  it("should throw 404 error if username is empty.", async () => {
    const invalidUsername = { data: { username: "", password: "123" } }
    const url = "/login"
    const errorMessage = "Username or Password can't be empty."

    let spyMPost = jest.spyOn(axios, "post")

    mock.onPost(url, invalidUsername).replyOnce(404, { message: errorMessage })

    try {
      await axios.post(url, invalidUsername)
    } catch (error) {
      expect(error.response.status).toBe(404)
      expect(error.response.data.message).toBe(errorMessage)
    }

    expect(spyMPost).toHaveBeenCalledWith(url, invalidUsername)
  })

  it("should throw 404 error if password is empty.", async () => {
    const invalidPassword = { data: { username: "test", password: "" } }
    const url = "/login"
    const errorMessage = "Username or Password can't be empty."
    let spyMPost = jest.spyOn(axios, "post")

    mock.onPost(url, invalidPassword).replyOnce(404, { message: errorMessage })

    try {
      await axios.post(url, invalidPassword)
    } catch (error) {
      expect(error.response.status).toBe(404)
      expect(error.response.data.message).toBe(errorMessage)
    }

    expect(spyMPost).toHaveBeenCalledWith(url, invalidPassword)
  })
})

describe("Update registered user password.", () => {
  it("should throw 404 error if username is empty.", async () => {
    const invalidUsername = { data: { username: "", password: "123" } }
    const url = "/forgot-password"
    const errorMessage = "Username or Password can't be empty."

    let spyMPatch = jest.spyOn(axios, "patch")

    mock.onPatch(url, invalidUsername).replyOnce(404, { message: errorMessage })

    try {
      await axios.patch(url, invalidUsername)
    } catch (error) {
      expect(error.response.status).toBe(404)
      expect(error.response.data.message).toBe(errorMessage)
    }

    expect(spyMPatch).toHaveBeenCalledWith(url, invalidUsername)
  })

  it("should throw 404 error if password is empty.", async () => {
    const invalidUsername = { data: { username: "test", password: "" } }
    const url = "/forgot-password"
    const errorMessage = "Username or Password can't be empty."

    let spyMPatch = jest.spyOn(axios, "patch")

    mock.onPatch(url, invalidUsername).replyOnce(404, { message: errorMessage })

    try {
      await axios.patch(url, invalidUsername)
    } catch (error) {
      expect(error.response.status).toBe(404)
      expect(error.response.data.message).toBe(errorMessage)
    }

    expect(spyMPatch).toHaveBeenCalledWith(url, invalidUsername)
  })
})
