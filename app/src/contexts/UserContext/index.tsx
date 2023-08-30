import React, { createContext, useContext } from "react"
import { BookmarkedMovies } from "../../types"
import { useQuery } from "react-query"
import { api } from "../../lib/api"
import { AuthContextProvider } from "../AuthContext"

interface UserContextInterfaceProps {
  children: React.ReactNode
}

interface UserContextInterface {
  bookmarkedMovies: BookmarkedMovies | undefined
}

export const UserContextProvider = createContext<UserContextInterface>(
  {} as UserContextInterface
)

const UserContext = ({ children }: UserContextInterfaceProps) => {
  const { userAuthenticated } = useContext(AuthContextProvider)

  const { data: bookmarkedMovies } = useQuery<BookmarkedMovies>({
    queryKey: ["getUserBookmarkedMovies"],

    queryFn: async () => {
      try {
        const response = await api.post("/bookmarked-movies", {
          data: { userToken: userAuthenticated.userToken },
        })

        return response.data
      } catch (e) {
        console.log("There was an error...")
      }
    },

    enabled: !!userAuthenticated.userToken,
  })

  return (
    <UserContextProvider.Provider
      value={{
        bookmarkedMovies,
      }}
    >
      {children}
    </UserContextProvider.Provider>
  )
}

export default UserContext
