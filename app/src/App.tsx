import GlobalStyle from "./globalStyles"
import { QueryClient, QueryClientProvider } from "react-query"
import RoutesHandler from "./routes"
import AuthContext from "./contexts/AuthContext"
import UserContext from "./contexts/UserContext"
import AppContext from "./contexts/AppContext"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext>
        <UserContext>
          <AppContext>
            <GlobalStyle />
            <RoutesHandler />
          </AppContext>
        </UserContext>
      </AuthContext>
    </QueryClientProvider>
  )
}

export default App
