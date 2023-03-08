import { AppBar, Stack, Toolbar, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styles from './SidebarLayout.module.css';

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
        <Typography className={styles.title} variant="h5" component="div" sx={{ flexGrow: 1 }}>
          Web Ranking
        </Typography>
        <Stack spacing={2} direction="row">
          <nav className={styles.nav}>
            <Link href="/contact" legacyBehavior>
            <button className={styles.primary_btn} role="button">
              <a>Voters</a>
            </button>
            </Link>
          </nav>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default SidebarLayout;
