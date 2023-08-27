import { Route, Navigate, BrowserRouter, Routes } from "react-router-dom"
import Home from "../pages/Home"
import Login from "../pages/Login"
import { AppContainer } from "../globalStyles"
import Header from "../components/Header"
import Register from "../pages/Register"
import { Fragment } from "react"

const RoutesHandler = () => {
  const hideHeader =
    window?.location?.href.includes("/login") ||
    window?.location?.href.includes("/register") ||
    window?.location?.href.includes("/forgot-password")

  return (
    <BrowserRouter>
      <AppContainer>
        {!hideHeader ? <Header /> : null}
        <Routes>
          <Fragment>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Fragment>
        </Routes>
      </AppContainer>
    </BrowserRouter>
  )
}
export default RoutesHandler
