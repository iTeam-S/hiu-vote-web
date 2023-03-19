import { AppBar, Stack, Toolbar, Typography } from '@mui/material'
import Image from 'next/image'
import React, { useState, useLayoutEffect } from 'react'
import styles from './SidebarLayout.module.css'
import { animateScroll as scroll } from 'react-scroll'
import { FaUsers } from 'react-icons/fa'

export interface ISidebarLayout {}

const SidebarLayout: React.FC<ISidebarLayout> = () => {
  const [widthScreen, setWidthScreen] = useState<number>(0)
  const isMobileScreen = widthScreen <= 656

  useLayoutEffect(() => {
    const handleResize = () => setWidthScreen(window.innerWidth)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  function scrollToComponent() {
    const element = document.querySelector('#contrib-link') as HTMLElement
    if (element !== null) {
      scroll.scrollTo(element.offsetTop, {
        duration: 1000,
        delay: 100,
        smooth: true,
        offset: -70,
      })
    }
  }

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
              {isMobileScreen ? (
                <FaUsers size={25} />
              ) : (
                <>
                  <FaUsers size={25} /> <span style={{ width: 10 }}></span>
                  Contributeurs
                </>
              )}
            </button>
          </nav>
        </Stack>
      </Toolbar>
    </AppBar>
  )
}

export default SidebarLayout
