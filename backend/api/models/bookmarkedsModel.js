import prisma from "../../lib/prisma.js"

export default class BookmarkedsModel {
  async checkIfUserExists(decodedToken) {
    const isUserRegistered = await prisma.user.findUnique({
      where: {
        id: decodedToken.id,
        username: decodedToken.username,
      },
    })

    return isUserRegistered
  }

  async insertBookmarked(data) {
    await prisma.bookmarkedFilms.create({
      data,
    })
  }

  async removeBookmarked(film, userId) {
    const bookmarkToDelete = await prisma.bookmarkedFilms.findFirst({
      where: {
        filmId: film.id.toString(),
        userId: userId,
      },
    })

    await prisma.bookmarkedFilms.delete({
      where: {
        id: bookmarkToDelete.id,
        AND: {
          userId: userId,
        },
      },
    })
  }

  async getUserBookmarkedsOnDatabase(user) {
    const userData = await prisma.user.findUnique({
      where: {
        username: user.username,
        id: user.id,
      },
      select: {
        bookmarkedFilms: true,
      },
    })

    return userData
  }
}
