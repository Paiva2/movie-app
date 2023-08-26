import GlobalStyle, { AppContainer } from "./globalStyles"
import Header from "./components/Header"
import PageContainer from "./components/PageContainer"
import HomeBanner from "./components/HomeBanner"
import HomeMiddleSection from "./components/HomeMiddleSection"
import { QueryClient, QueryClientProvider } from "react-query"

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

        <PageContainer>
          <HomeBanner />
          <HomeMiddleSection />
        </PageContainer>
      </AppContainer>
    </QueryClientProvider>
  )
}

export default App
