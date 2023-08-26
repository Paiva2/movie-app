import GlobalStyle, { AppContainer } from "./globalStyles"
import Header from "./components/Header"
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
      <AppContainer>
        <GlobalStyle />
        <Header />
        <RoutesHandler />
      </AppContainer>
    </QueryClientProvider>
  )
}

export default App
