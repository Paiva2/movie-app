import React, { createContext, useState, Dispatch, SetStateAction } from "react"

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
}

export const AppContextProvider = createContext<AppContextInterface>(
  {} as AppContextInterface
)

const AppContext = ({ children }: AppContextProviderProps) => {
  const [showImageProfile, setShowImageProfile] = useState<Blob>()
  const [headerPosition, setHeaderPosition] = useState(true)
  const [openMenuProfile, setOpenMenuProfile] = useState(false)

  return (
    <AppContextProvider.Provider
      value={{
        showImageProfile,
        headerPosition,
        openMenuProfile,
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
