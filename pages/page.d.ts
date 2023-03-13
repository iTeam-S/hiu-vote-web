import { NextPage } from 'next'
import { ReactElement, ReactNode } from 'react'

export type NextPageWithLayout<P = { object }> = NextPage<P> & {
  getLayout?: (_page: ReactElement) => ReactNode
  layout?: ReactNode
}
