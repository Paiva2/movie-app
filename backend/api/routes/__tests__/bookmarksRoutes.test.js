import supertest from "supertest"
import app from "../../../index.js"
import prismaMock from "../../../singleton"
import bcrypt from "bcrypt"

import { jest } from "@jest/globals"
import AuthenticationModel from "../../models/authenticationModel.js"

const authModel = new AuthenticationModel()

function encryptPassword(saltRounds = 10, data) {
  const passwordToHash = data
  const hashedPassword = bcrypt.hashSync(passwordToHash, saltRounds)

  return hashedPassword
}

const request = supertest(app)
prismaMock.user.findFirst = jest.fn()
prismaMock.user.findUnique = jest.fn()
prismaMock.user.create = jest.fn()
prismaMock.bookmarkedFilms.create = jest.fn()
prismaMock.bookmarkedFilms.delete = jest.fn()
prismaMock.bookmarkedFilms.findFirst = jest.fn()

describe("Get user Bookmarks", () => {
  const userLogin = {
    username: "testUser",
    password: "1234567",
  }

  beforeEach(async () => {
    const hashedPassword = encryptPassword(10, userLogin.password)

    const finalUser = {
      id: 1,
      username: "testUser",
      password: hashedPassword,
      image: "https://i.postimg.cc/XvrwMSKy/transferir.jpg",
    }

    await prismaMock.user.create.mockResolvedValue(finalUser)
    await prismaMock.user.findUnique.mockResolvedValue(finalUser)

    await request.post("/register").send({ data: userLogin })
  })

  it("should create a new bookmark data.", async () => {
    const { body: user } = await request.post("/login").send({
      data: {
        username: userLogin.username,
        password: userLogin.password,
      },
    })

    const userToken = user.token

    const randomData = await request.get("/movies")

    const filmToPerformAction = {
      filmId: randomData.body[0].id.toString(),
      title: randomData.body[0].title,
      poster: randomData.body[0].poster_path,
      overview: randomData.body[0].overview,
      first_air_date: randomData.body[0].release_date,
      backdrop_path: randomData.body[0].backdrop_path,
      userId: user.userId,
      mediaType: randomData.body[0].media_type ?? "movie",
    }

    await prismaMock.bookmarkedFilms.create.mockResolvedValue(filmToPerformAction)

    const res = await request.patch("/bookmark-movie/action=insert").send({
      data: {
        dataInfos: randomData.body[0],
        user: userToken,
        category: randomData.body[0].media_type ?? "movie",
      },
    })

    expect(res.status).toBe(201)
    expect(res.body).toEqual({ message: "Film bookmarked with success!" })
  })

  it("should delete a user bookmark data.", async () => {
    const { body: user } = await request.post("/login").send({
      data: {
        username: userLogin.username,
        password: userLogin.password,
      },
    })

    const userToken = user.token

    const randomData = await request.get("/movies")

    const filmToPerformAction = {
      filmId: randomData.body[0].id.toString(),
      title: randomData.body[0].title,
      poster: randomData.body[0].poster_path,
      overview: randomData.body[0].overview,
      first_air_date: randomData.body[0].release_date,
      backdrop_path: randomData.body[0].backdrop_path,
      userId: user.userId,
      mediaType: randomData.body[0].media_type ?? "movie",
    }

    await prismaMock.bookmarkedFilms.create.mockResolvedValue(filmToPerformAction)

    await request.patch("/bookmark-movie/action=insert").send({
      data: {
        dataInfos: randomData.body[0],
        user: userToken,
        category: randomData.body[0].media_type ?? "movie",
      },
    })

    await prismaMock.bookmarkedFilms.findFirst.mockResolvedValue({
      bookmarkedFilms: [
        {
          filmId: randomData.body[0].id,
          title: randomData.body[0].title,
          poster: randomData.body[0].poster_path,
          overview: randomData.body[0].overview,
          first_air_date: randomData.body[0].release_date,
          createdAt: new Date(),
          backdrop_path: randomData.body[0].backdrop_path,
          mediaType: randomData.body[0].media_type ?? "movie",
          userId: user.userId,
        },
      ],
    })

    await prismaMock.bookmarkedFilms.delete.mockResolvedValue({
      where: {
        id: filmToPerformAction.filmId,
        AND: {
          userId: user.userId,
        },
      },
    })

    const res = await request.patch("/bookmark-movie/action=remove").send({
      data: {
        dataInfos: randomData.body[0],
        user: userToken,
        category: randomData.body[0].media_type ?? "movie",
      },
    })

    expect(res.status).toBe(200)
    expect(res.body).toEqual({
      message: "Film removed from bookmarked list with success!",
    })
  })

  it("should get all user bookmarked data.", async () => {
    const { body: user } = await request.post("/login").send({
      data: {
        username: userLogin.username,
        password: userLogin.password,
      },
    })

    const userToken = user.token

    const randomData = await request.get("/movies")

    const filmToPerformAction = {
      filmId: randomData.body[0].id.toString(),
      title: randomData.body[0].title,
      poster: randomData.body[0].poster_path,
      overview: randomData.body[0].overview,
      first_air_date: randomData.body[0].release_date,
      backdrop_path: randomData.body[0].backdrop_path,
      userId: user.userId,
      mediaType: randomData.body[0].media_type ?? "movie",
    }

    await request.patch("/bookmark-movie/action=insert").send({
      data: {
        dataInfos: randomData.body[0],
        user: userToken,
        category: randomData.body[0].media_type ?? "movie",
      },
    })

    await prismaMock.bookmarkedFilms.create.mockResolvedValue(filmToPerformAction)
    await prismaMock.user.findUnique.mockResolvedValue({
      bookmarkedFilms: [
        {
          filmId: randomData.body[0].id,
          title: randomData.body[0].title,
          poster: randomData.body[0].poster_path,
          overview: randomData.body[0].overview,
          first_air_date: randomData.body[0].release_date,
          createdAt: new Date(),
          backdrop_path: randomData.body[0].backdrop_path,
          mediaType: randomData.body[0].media_type ?? "movie",
          userId: user.userId,
        },
      ],
    })

    const userBookmarkeds = await request.post("/bookmarked-movies").send({
      data: {
        userToken,
      },
    })

    expect(userBookmarkeds.body.bookmarkedFilms.length).toBeGreaterThan(0)

    expect(userBookmarkeds.body.bookmarkedFilms[0].title).toEqual(
      filmToPerformAction.title
    )

    expect(userBookmarkeds.body.bookmarkedFilms).toStrictEqual(
      expect.arrayContaining([
        {
          title: expect.any(String),
          filmId: expect.any(Number),
          poster: expect.any(String),
          overview: expect.any(String),
          first_air_date: expect.any(String),
          createdAt: expect.any(String),
          backdrop_path: expect.any(String),
          mediaType: expect.any(String),
          userId: expect.any(Number),
        },
      ])
    )
  })

  it("should throw an error if request has no user token to bookmark any data.", async () => {
    const randomData = await request.get("/movies")

    const res = await request.patch("/bookmark-movie/action=insert").send({
      data: {
        dataInfos: randomData.body[0],
        user: null,
        category: randomData.body[0].media_type ?? "movie",
      },
    })

    expect(res.status).toBe(404)
    expect(res.body).toEqual({ message: "Invalid user token." })
  })

  it("should throw an error if request has no tv show or movie data to bookmark.", async () => {
    const { body: user } = await request.post("/login").send({
      data: {
        username: userLogin.username,
        password: userLogin.password,
      },
    })

    const userToken = user.token

    const randomData = await request.get("/movies")

    const res = await request.patch("/bookmark-movie/action=insert").send({
      data: {
        dataInfos: null,
        user: userToken,
        category: randomData.body[0].media_type ?? "movie",
      },
    })

    expect(res.status).toBe(404)
    expect(res.body).toEqual({ message: "Invalid data informations." })
  })

  it("should throw an error if request has user token to get bookmarkeds.", async () => {
    const randomData = await request.get("/movies")

    const res = await request.patch("/bookmark-movie/action=insert").send({
      data: {
        dataInfos: randomData.body[0],
        user: null,
        category: randomData.body[0].media_type ?? "movie",
      },
    })

    expect(res.status).toBe(404)
    expect(res.body).toEqual({ message: "Invalid user token." })
  })
})
