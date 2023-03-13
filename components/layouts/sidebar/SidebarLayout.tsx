import { AppBar, Stack, Toolbar, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import styles from './SidebarLayout.module.css'
import { animateScroll as scroll } from 'react-scroll'

function scrollToComponent() {
  const element = document.querySelector('#voters-link') as HTMLElement
  if (element !== null) {
    scroll.scrollTo(element.offsetTop, {
      duration: 1000,
      delay: 100,
      smooth: true,
      offset: -70,
    })
  }
}

export interface ISidebarLayout {}

const SidebarLayout: React.FC<ISidebarLayout> = () => {
  return (
    <AppBar position="fixed" color="secondary" className={styles.navbar}>
      <Toolbar>
        <Image
          className={styles.logo}
          src="https://iteam-s.mg/assets/img/LOGO.png"
          alt="logo"
          width={50}
          height={50}
          style={{ marginRight: '1.5rem', width: '100', height: '100' }}
        />
        <Typography
          className={styles.title}
          variant="h5"
          component="div"
          sx={{ flexGrow: 1 }}
        >
          Statistique HIU Cote 2023
        </Typography>
        <Stack spacing={2} direction="row">
          <nav className={styles.nav}>
            <button className={styles.primary_btn} onClick={scrollToComponent}>
              Voters
            </button>
          </nav>
        </Stack>
      </Toolbar>
    </AppBar>
  )
}

export default SidebarLayout
