import GlobalStyle from "./globalStyles"
import { QueryClient, QueryClientProvider } from "react-query"
import RoutesHandler from "./routes"

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
      <GlobalStyle />
      <RoutesHandler />
    </QueryClientProvider>
  )
}

export default App
