import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import { AppBar, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import styles from './SidebarLayout.module.css';

export interface ISidebarLayout {}

const SidebarLayout: React.FC<ISidebarLayout> = () => {
  return (
    <AppBar position="fixed" color="secondary" className={styles.navbar}>
      <Toolbar>
        <IconButton size="large" color="inherit" edge="start" aria-label="logo">
          <CatchingPokemonIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Web Ranking
        </Typography>
        <Stack spacing={2} direction="row">
          <nav className={styles.nav}>
            <Link href="/contact" legacyBehavior>
              <a>Voters</a>
            </Link>
          </nav>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default SidebarLayout;
