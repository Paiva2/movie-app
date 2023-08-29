import React, { createContext, useState, useEffect, useContext } from "react"
import { FilmProps } from "../../types"
import { useQuery } from "react-query"
import { api } from "../../lib/api"
import { AuthContextProvider } from "../AuthContext"

interface UserContextInterfaceProps {
  children: React.ReactNode
}

interface UserContextInterface {
  userInformations: FilmProps[]
  setUserInformations: React.Dispatch<React.SetStateAction<FilmProps[]>>
}

export const UserContextProvider = createContext<UserContextInterface>(
  {} as UserContextInterface
)

const UserContext = ({ children }: UserContextInterfaceProps) => {
  const [userInformations, setUserInformations] = useState<
    FilmProps[] | undefined
  >(undefined)

  const { userAuthenticated } = useContext(AuthContextProvider)

  const { data: bookmarkedMovies } = useQuery({
    queryKey: ["getUserBookmarkedMovies"],

    queryFn: async () => {
      try {
        const response = await api.post("/bookmarked-movies", {
          data: { userToken: userAuthenticated.userToken },
        })

        return response
      } catch (e) {
        console.log("There was an error...")
      }
    },
    enabled: userAuthenticated.isUserAuth,
  })

  useEffect(() => {
    if (!userAuthenticated.isUserAuth) return

    setUserInformations(bookmarkedMovies)
  }, [window.location.pathname, userAuthenticated])

  return (
    <UserContextProvider.Provider
      value={{
        userInformations,
        setUserInformations,
      }}
    >
      {children}
    </UserContextProvider.Provider>
  )
}

export default UserContext
