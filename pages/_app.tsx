/* mui */
import { ThemeProvider } from '@mui/material/styles'

/* next */
import type { AppProps } from 'next/app'
import theme from '../theme'
import { NextPageWithLayout } from './page'

/* styles */
import '../styles/globals.css'

// ===========================================================

interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <ThemeProvider theme={theme}>
      {getLayout(<Component {...pageProps} />)}
    </ThemeProvider>
  )
}
