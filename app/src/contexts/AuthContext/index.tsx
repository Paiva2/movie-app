import React, { createContext, useState } from "react"

interface AuthContextProviderProps {
  children: React.ReactNode
}

interface AuthContextInterface {
  userAuthenticated: boolean
  setUserAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}

export const AuthContextProvider = createContext<AuthContextInterface>(
  {} as AuthContextInterface
)

const AuthContext = ({ children }: AuthContextProviderProps) => {
  const [userAuthenticated, setUserAuthenticated] = useState(false)

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
