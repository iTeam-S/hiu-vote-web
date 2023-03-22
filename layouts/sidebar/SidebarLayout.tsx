import React from 'react'

/* mui */
import {
  AppBar,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material'

/* next */
import Image from 'next/image'
import Link from 'next/link'

/* libs */
import { animateScroll as scroll } from 'react-scroll'

/* icons */
import { FaUsers } from 'react-icons/fa'

/* types */
import { I_SidebarLayout } from '../../types'

/* styles */
import styles from './SidebarLayout.module.css'

// ===========================================================

const SidebarLayout: React.FC<I_SidebarLayout> = () => {
  const isMobileScreen = useMediaQuery('(max-width: 656px)')

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
    <React.Fragment>
      <AppBar position="fixed" color="secondary" className={styles.navbar}>
        <Toolbar>
          <Link href="https://iteam-s.mg" target="_blank" rel="noreferrer">
            <Image
              className={styles.logo}
              src="https://iteam-s.mg/assets/img/LOGO.png"
              alt="logo"
              width={50}
              height={50}
              style={{ marginRight: '1.5rem', width: '100', height: '100' }}
            />
          </Link>

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
              <button
                className={styles.primary_btn}
                onClick={scrollToComponent}
              >
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
    </React.Fragment>
  )
}

export default SidebarLayout
