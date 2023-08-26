import React from "react"
import { Container } from "./styles"

const PageContainer = ({ children }: { children: React.ReactNode }) => {
  return <Container>{children}</Container>
}

export default PageContainer
