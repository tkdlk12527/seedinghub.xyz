import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@/components/theme-provider'
import { StatsProvider } from '@/contexts/stats-provider'
import { LayoutWrapper } from '@/components/layout-wrapper'
import DealsPage from '@/pages/DealsPage'
import ShortIdRedirect from '@/pages/ShortIdRedirect'

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <StatsProvider>
        <BrowserRouter>
          <LayoutWrapper>
            <Routes>
              <Route path="/" element={<DealsPage />} />
              <Route path="/:shortId" element={<ShortIdRedirect />} />
            </Routes>
          </LayoutWrapper>
        </BrowserRouter>
      </StatsProvider>
    </ThemeProvider>
  )
}
