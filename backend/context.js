import { mockDeep } from "jest-mock-extended"

const createMockContext = () => {
  return {
    prisma: mockDeep(),
  }
}

export default createMockContext
