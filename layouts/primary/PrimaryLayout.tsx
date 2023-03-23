import React from 'react'

/* next */
import Head from 'next/head'

/* types */
import { I_PrimaryLayout } from '../../types'

/* styles */
import styles from './PrimaryLayout.module.css'

// ===========================================================

export default function PrimaryLayout({ children }: I_PrimaryLayout) {
  return (
    <React.Fragment>
      <Head>
        <title>HIU 2023 Cote</title>
      </Head>
      <main className={styles.main}>{children}</main>
    </React.Fragment>
  )
}
