import prisma from "../../lib/prisma.js"

export default class AuthenticationModel {
  async submitAuthenticationToDatabase(username) {
    const getUser = await prisma.user.findUnique({
      where: {
        username,
      },
    })

    return getUser
  }

  async submitRegisterToDatabase(username, password) {
    await prisma.user.create({
      data: {
        username,
        password,
        image: "https://i.postimg.cc/XvrwMSKy/transferir.jpg",
      },
    })
  }

  async submitUserPasswordChange(username, password) {
    await prisma.user.update({
      where: {
        username,
      },
      data: {
        password,
      },
    })
  }

  async checkIfUserExists(username) {
    const findUser = await prisma.user.findFirst({
      where: {
        username,
      },
    })

    return findUser
  }
}
