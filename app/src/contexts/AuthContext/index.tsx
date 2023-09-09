import React, {
  createContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react"
import { UserAuthentication } from "../../types"
import Cookies from "js-cookie"

interface AuthContextProviderProps {
  children: React.ReactNode
}

interface AuthContextInterface {
  userAuthenticated: UserAuthentication
  setUserAuthenticated: Dispatch<SetStateAction<UserAuthentication>>
}

export const AuthContextProvider = createContext<AuthContextInterface>(
  {} as AuthContextInterface
)

const AuthContext = ({ children }: AuthContextProviderProps) => {
  const [userAuthenticated, setUserAuthenticated] = useState({
    isUserAuth: false,
    userToken: "",
  })

  useEffect(() => {
    const userHasToken = Cookies.get("movie-app-auth")

    if (!userHasToken) return

    setUserAuthenticated({
      userToken: userHasToken,
      isUserAuth: true,
    })
  }, [userAuthenticated.isUserAuth])

  return (
    <AuthContextProvider.Provider
      value={{
        userAuthenticated,
        setUserAuthenticated,
      }}
    >
      {children}
    </AuthContextProvider.Provider>
  )
}

export default AuthContext
