import { Navigate, useLocation } from "react-router-dom"
import { AuthContextProvider } from "../../contexts/AuthContext"
import { useContext, useState, useEffect } from "react"

export function RequireAuthRoute({ children }: { children: JSX.Element }) {
  const location = useLocation()
  const { userAuthenticated } = useContext(AuthContextProvider)
  const [waitRender, setWaitRender] = useState(false)

  useEffect(() => {
    setWaitRender(true)
  }, [])

  if (!waitRender) return null

  if (!userAuthenticated.isUserAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />
  } else {
    return children
  }
}
