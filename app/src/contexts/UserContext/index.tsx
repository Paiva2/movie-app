import React, {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react"
import {
  BookmarkSchema,
  BookmarkedMovies,
  FilmProps,
  UserProfileSchema,
} from "../../types"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { api } from "../../lib/api"
import { AuthContextProvider } from "../AuthContext"

interface UserContextInterfaceProps {
  children: React.ReactNode
}

interface UserContextInterface {
  bookmarkedMovies: BookmarkedMovies | undefined
  userProfile: UserProfileSchema | undefined

  selectedFilmDescriptions: FilmProps
  setSelectedFilmDescriptions: Dispatch<SetStateAction<FilmProps>>

  openMovieModal: boolean
  setOpenMovieModal: Dispatch<SetStateAction<boolean>>

  handleSetBookmark: (
    filmToBookmark: FilmProps,
    category: string,
    action: "insert" | "remove"
  ) => void

  bookmarkingData: boolean
}

export const UserContextProvider = createContext<UserContextInterface>(
  {} as UserContextInterface
)

const UserContext = ({ children }: UserContextInterfaceProps) => {
  const { userAuthenticated } = useContext(AuthContextProvider)

  const [selectedFilmDescriptions, setSelectedFilmDescriptions] =
    useState<FilmProps>({} as FilmProps)

  const [openMovieModal, setOpenMovieModal] = useState(false)
  const [bookmarkingData, setBookmarkingData] = useState(false)

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

  const { data: userProfile } = useQuery<UserProfileSchema>({
    queryKey: ["getUserProfile"],

    queryFn: async () => {
      try {
        const response = await api.post("/user-profile", {
          data: { userToken: userAuthenticated.userToken },
        })

        return response.data.data
      } catch (e) {
        console.log("There was an error...")
      }
    },

    enabled: !!userAuthenticated.userToken,
  })

  const queryClient = useQueryClient()

  const bookMarkFilm = useMutation({
    mutationFn: async (bookmarkSchema: BookmarkSchema) => {
      setBookmarkingData(true)

      try {
        const response = await api.patch(
          `/bookmark-movie/action=${bookmarkSchema.action}`,
          {
            data: {
              dataInfos: bookmarkSchema.film,
              user: bookmarkSchema.user,
              category: bookmarkSchema.category,
            },
          }
        )

        setBookmarkingData(false)

        return response
      } catch (e) {
        console.log("There was an error...")
      }
    },
  })

  const handleSetBookmark = async (
    filmToBookmark: FilmProps,
    category: string,
    action: "insert" | "remove"
  ) => {
    const bookmarkBody = {
      film: filmToBookmark,
      category: category,
      user: userAuthenticated.userToken,
      action: action,
    }

    try {
      await bookMarkFilm.mutateAsync(bookmarkBody)
    } catch (e) {
      console.log(e)
    } finally {
      queryClient.invalidateQueries("getUserBookmarkedMovies")
      queryClient.invalidateQueries("getHomeTrendings")
      queryClient.invalidateQueries("getHomeMovies")
      queryClient.invalidateQueries("getHomeTvShows")
    }
  }

  return (
    <UserContextProvider.Provider
      value={{
        bookmarkedMovies,
        selectedFilmDescriptions,
        userProfile,
        openMovieModal,
        bookmarkingData,
        handleSetBookmark,
        setSelectedFilmDescriptions,
        setOpenMovieModal,
      }}
    >
      {children}
    </UserContextProvider.Provider>
  )
}

export default UserContext
