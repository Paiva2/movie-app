import React, { useContext } from "react"
import { Container } from "./styles"
import { AppContextProvider } from "../../contexts/AppContext"

const PageContainer = ({ children }: { children: React.ReactNode }) => {
  const { setOpenFilterList } = useContext(AppContextProvider)

  return (
    <Container onClick={() => setOpenFilterList(false)}>{children}</Container>
  )
}

export default PageContainer
