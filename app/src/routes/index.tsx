import { Route, Navigate, BrowserRouter, Routes } from "react-router-dom"
import Home from "../pages/Home"
import Login from "../pages/Login"
import { AppContainer } from "../globalStyles"
import Header from "../components/Header"
import Register from "../pages/Register"
import { Fragment, useContext, useEffect, useState } from "react"
import { AuthContextProvider } from "../contexts/AuthContext"
import { RequireAuthRoute } from "../components/RequireAuthRoute"
import ForgotPassword from "../pages/ForgotPassword"
import { NoAuthRoute } from "../components/NotAuthRoute"
import UserBookmarks from "../pages/UserBookmarks"
import MoviesPage from "../pages/MoviesPage"
import SearchResults from "../pages/SearchResults"
import TvShowPage from "../pages/TvShowPage"

const RoutesHandler = () => {
  const { userAuthenticated } = useContext(AuthContextProvider)

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
              path="/search"
              element={
                <RequireAuthRoute>
                  <SearchResults />
                </RequireAuthRoute>
              }
            />

            <Route
              path="/movies"
              element={
                <RequireAuthRoute>
                  <MoviesPage />
                </RequireAuthRoute>
              }
            />

            <Route
              path="/tv-show"
              element={
                <RequireAuthRoute>
                  <TvShowPage />
                </RequireAuthRoute>
              }
            />

            <Route
              path="/bookmarked"
              element={
                <RequireAuthRoute>
                  <UserBookmarks />
                </RequireAuthRoute>
              }
            />

            <Route
              path="/login"
              element={
                <NoAuthRoute>
                  <Login />
                </NoAuthRoute>
              }
            />
            <Route
              path="/register"
              element={
                <NoAuthRoute>
                  <Register />
                </NoAuthRoute>
              }
            />
            <Route
              path="/forgot-password"
              element={
                <NoAuthRoute>
                  <ForgotPassword />
                </NoAuthRoute>
              }
            />
          </Fragment>
        </Routes>
      </AppContainer>
    </BrowserRouter>
  )
}
export default RoutesHandler
