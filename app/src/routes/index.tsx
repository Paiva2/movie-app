import { Route, Navigate, BrowserRouter, Routes } from "react-router-dom"
import Home from "../pages/Home"
import Login from "../pages/Login"
import { AppContainer } from "../globalStyles"
import Header from "../components/Header"

const RoutesHandler = () => {
  const hideHeader = window?.location?.href.includes("/login")

  return (
    <BrowserRouter>
      <AppContainer>
        {!hideHeader ? <Header /> : null}
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AppContainer>
    </BrowserRouter>
  )
}
export default RoutesHandler
