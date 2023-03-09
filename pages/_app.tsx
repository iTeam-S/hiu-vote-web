import { ThemeProvider } from '@mui/material/styles'
import type { AppProps } from 'next/app'
import '../styles/globals.css'
import theme from '../theme'
import { NextPageWithLayout } from './page'

interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <ThemeProvider theme={theme}>
      {getLayout(<Component {...pageProps} />)}
    </ThemeProvider>
  )
}

export default MyApp
