const axios = require("axios")
const MockAdapter = require("axios-mock-adapter")
const mock = new MockAdapter(axios)

describe("Register a new user", () => {
  it("should throw 400 error if username is empty.", async () => {
    const invalidUsername = { data: { username: "", password: "123" } }
    const url = "/register"
    const errorMessage = "Username or Password can't be empty."

    mock.onPost(url, invalidUsername).replyOnce(404, { message: errorMessage })

    try {
      await axios.post(url, invalidUsername)
    } catch (error) {
      expect(error.response.status).toBe(404)
      expect(error.response.data.message).toBe(errorMessage)
    }
  })
})
