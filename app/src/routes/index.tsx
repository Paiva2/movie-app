import { Route, Navigate, BrowserRouter, Routes } from "react-router-dom"
import Home from "../pages/Home"
import Login from "../pages/Login"
import { AppContainer } from "../globalStyles"
import Header from "../components/Header"
import Register from "../pages/Register"
import { Fragment, useContext, useEffect, useState } from "react"
import Cookies from "js-cookie"
import { AuthContextProvider } from "../contexts/AuthContext"
import { RequireAuthRoute } from "../components/RequireAuthRoute"
import ForgotPassword from "../pages/ForgotPassword"

const RoutesHandler = () => {
  const { setUserAuthenticated, userAuthenticated } =
    useContext(AuthContextProvider)

  const [hideHeader, setHideHeader] = useState<null | boolean>(true)

  function checkLocationToHideComponent(pathnames: string[]) {
    return pathnames.some((route) => {
      return window.location.href.includes(route)
    })
  }

  function willHeaderStayHidden() {
    const routes = ["/login", "/register", "/forgot-password"]

    const checkIfHeaderShouldAppear = checkLocationToHideComponent(routes)

    if (checkIfHeaderShouldAppear) {
      setHideHeader(true)
    } else {
      setHideHeader(false)
    }
  }

  useEffect(() => {
    const isUserAuth = Cookies.get("movie-app-auth")

    if (!isUserAuth) return

    setUserAuthenticated(true)
  }, [window.location.pathname])

  useEffect(() => {
    willHeaderStayHidden()
  }, [window.location.pathname, userAuthenticated])

  return (
    <BrowserRouter>
      <AppContainer>
        {!hideHeader ? <Header /> : null}
        <Routes>
          <Fragment>
            <Route path="/" element={<Navigate to="/home" />} />

            <Route
              path="/home"
              element={
                <RequireAuthRoute>
                  <Home />
                </RequireAuthRoute>
              }
            />
            <Route
              path="/login"
              element={!userAuthenticated ? <Login /> : <Navigate to="/home" />}
            />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Fragment>
        </Routes>
      </AppContainer>
    </BrowserRouter>
  )
}
export default RoutesHandler
