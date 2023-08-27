import { Navigate, useLocation } from "react-router-dom"
import { AuthContextProvider } from "../../contexts/AuthContext"
import { useContext } from "react"

export function RequireAuthRoute({ children }: { children: JSX.Element }) {
  const location = useLocation()
  const { userAuthenticated } = useContext(AuthContextProvider)

  if (!userAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  } else {
    return children
  }
}
