import GlobalStyle from "./globalStyles"
import { QueryClient, QueryClientProvider } from "react-query"
import RoutesHandler from "./routes"
import AuthContext from "./contexts/AuthContext"

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
        <GlobalStyle />
        <RoutesHandler />
      </AuthContext>
    </QueryClientProvider>
  )
}

export default App
