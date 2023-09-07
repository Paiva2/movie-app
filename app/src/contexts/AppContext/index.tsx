import React, { createContext, useState, Dispatch, SetStateAction } from "react"
import { useQuery } from "react-query"
import { FilmProps } from "../../types"
import { api } from "../../lib/api"
import { AxiosResponse } from "axios"

interface AppContextProviderProps {
  children: React.ReactNode
}

interface AppContextInterface {
  showImageProfile: Blob | undefined
  setShowImageProfile: Dispatch<SetStateAction<Blob | undefined>>

  headerPosition: boolean
  setHeaderPosition: Dispatch<SetStateAction<boolean>>

  openMenuProfile: boolean
  setOpenMenuProfile: Dispatch<SetStateAction<boolean>>

  homeMovies: AxiosResponse<FilmProps[]> | undefined
  homeMoviesIsLoading: boolean

  openMovieModal: boolean
  setOpenMovieModal: Dispatch<SetStateAction<boolean>>
}

export const AppContextProvider = createContext<AppContextInterface>(
  {} as AppContextInterface
)

const AppContext = ({ children }: AppContextProviderProps) => {
  const [showImageProfile, setShowImageProfile] = useState<Blob>()
  const [headerPosition, setHeaderPosition] = useState(true)
  const [openMenuProfile, setOpenMenuProfile] = useState(false)
  const [openMovieModal, setOpenMovieModal] = useState(false)

  const { data: homeMovies, isLoading: homeMoviesIsLoading } = useQuery({
    queryKey: ["getHomeMovies"],

    queryFn: async () => {
      try {
        const response = await api.get<FilmProps[]>("/movies")

        return response
      } catch (e) {
        console.log("There was an error...")
      }
    },
  })

  return (
    <AppContextProvider.Provider
      value={{
        showImageProfile,
        headerPosition,
        openMenuProfile,
        homeMovies,
        homeMoviesIsLoading,
        openMovieModal,
        setOpenMovieModal,
        setOpenMenuProfile,
        setShowImageProfile,
        setHeaderPosition,
      }}
    >
      {children}
    </AppContextProvider.Provider>
  )
}

export default AppContext
