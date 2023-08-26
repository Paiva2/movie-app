import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom"
import Home from "../pages/Home"

const RoutesHandler = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default RoutesHandler
