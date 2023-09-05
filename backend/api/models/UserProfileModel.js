import prisma from "../../lib/prisma.js"

export default class GetProfileModel {
  async getProfile(req, res, decodedToken) {
    const user = await prisma.user.findUnique({
      where: {
        id: decodedToken.id,
        username: decodedToken.username,
      },
    })

    if (!user) {
      return res.status(404).send({ message: "User not found." })
    }

    return user
  }

  updateProfile() {}
}
