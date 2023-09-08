import prisma from "../../lib/prisma.js"
import cloudinary from "cloudinary"

export default class UserProfileModel {
  async getProfile(_, res, decodedToken) {
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

  async updateProfilePicture(req, res, decodeUser) {
    try {
      const uploadResult = await cloudinary.uploader.upload(req.files[0].path, {
        resource_type: "image",
      })

      await prisma.user.update({
        where: {
          id: decodeUser.id,
          username: decodeUser.username,
        },
        data: {
          image: uploadResult.url,
        },
      })

      return res.status(200).json({ message: "Photo updated with success!" })
    } catch {
      return res
        .status(400)
        .json({ message: "There was an error uploading the image..." })
    }
  }
}
