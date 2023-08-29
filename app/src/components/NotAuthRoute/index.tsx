import { Navigate, useLocation } from "react-router-dom"
import { AuthContextProvider } from "../../contexts/AuthContext"
import { useContext, useState, useEffect } from "react"

export function NoAuthRoute({ children }: { children: JSX.Element }) {
  const location = useLocation()
  const { userAuthenticated } = useContext(AuthContextProvider)
  const [hasAuthCheckFinished, setHasAuthCheckFinished] = useState(false)

  useEffect(() => {
    setHasAuthCheckFinished(true)
  }, [])

  if (!hasAuthCheckFinished) return <></>

  if (userAuthenticated.isUserAuth) {
    return <Navigate to="/home" state={{ from: location }} replace />
  } else {
    return children
  }
}
