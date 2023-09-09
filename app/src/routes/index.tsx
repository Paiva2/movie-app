import { Route, Navigate, BrowserRouter, Routes } from "react-router-dom"
import Home from "../pages/Home"
import Login from "../pages/Login"
import { AppContainer } from "../globalStyles"
import Header from "../components/Header"
import Register from "../pages/Register"
import { Fragment } from "react"
import { RequireAuthRoute } from "../components/RequireAuthRoute"
import ForgotPassword from "../pages/ForgotPassword"
import { NoAuthRoute } from "../components/NotAuthRoute"
import UserBookmarks from "../pages/UserBookmarks"
import MoviesPage from "../pages/MoviesPage"
import SearchResults from "../pages/SearchResults"
import TvShowPage from "../pages/TvShowPage"
import TrendingPage from "../pages/TrendingsPage"

const RoutesHandler = () => {
  return (
    <BrowserRouter>
      <AppContainer>
        <Header />
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
              path="/trending"
              element={
                <RequireAuthRoute>
                  <TrendingPage />
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
