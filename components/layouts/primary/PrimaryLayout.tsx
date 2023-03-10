import Head from 'next/head'
import styles from './PrimaryLayout.module.css'

export interface IPrimaryLayout extends React.ComponentPropsWithoutRef<'div'> {
  justify?: 'items-center' | 'items-start'
}

const PrimaryLayout: React.FC<IPrimaryLayout> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Web Ranking</title>
      </Head>
      <main className={styles.main}>{children}</main>
    </>
  )
}

export default PrimaryLayout
