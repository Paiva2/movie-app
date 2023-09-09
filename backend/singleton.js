/* global jest, beforeEach */
import { mockDeep, mockReset } from "jest-mock-extended"
import { jest } from "@jest/globals"
import prisma from "./lib/prisma"

const prismaMock = prisma

jest.mock("./lib/prisma", () => ({
  __esModule: true,
  default: mockDeep(),
}))

beforeEach(() => {
  jest.resetModules()
  jest.resetAllMocks()
})

export default prismaMock
