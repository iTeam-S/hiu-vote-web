import React from 'react'

/* emotion */
import { Global } from '@emotion/react'

/* mui */
import { styled } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { grey } from '@mui/material/colors'
import { IconButton, SwipeableDrawer, Typography, Box } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

/* types */
import { T_SwipeableEdgeDrawer } from '../../types'

/* global */
const drawerBleeding = 56

const Root = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor:
    theme.palette.mode === 'light'
      ? grey[100]
      : theme.palette.background.default,
}))

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#567a7a' : grey[800],
}))

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}))

export default function SwipeableEdgeDrawer({
  children,
  title,
  titleClass,
  openDrawer,
  toggleDrawer,
  handleScroll,
}: T_SwipeableEdgeDrawer) {
  const containerRef = React.useRef(null)
  const container = containerRef.current
  return (
    <React.Fragment>
      <Root>
        <CssBaseline />
        <Global
          styles={{
            '.MuiDrawer-root > .MuiPaper-root': {
              height: '92%',
              overflow: 'visible',
              maxWidth: 600,
              margin: 'auto',
            },
          }}
        />
        <Box
          ref={containerRef}
          sx={{
            overflow: 'hidden',
            textAlign: 'center',
            background: '#eeeeee0',
          }}
        ></Box>

        <SwipeableDrawer
          container={container}
          anchor="bottom"
          open={openDrawer}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
          swipeAreaWidth={drawerBleeding}
          disableSwipeToOpen={false}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <StyledBox
            sx={{
              position: 'absolute',
              top: -drawerBleeding,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              visibility: 'visible',
              margin: 'auto',
              right: 0,
              left: 0,
            }}
          >
            <div className={titleClass}>
              <Puller />
              <Typography sx={{ p: 2, color: 'text.secondary' }}>
                {title}
              </Typography>
              {openDrawer && (
                <IconButton
                  size="small"
                  sx={{ position: 'absolute', right: 6, top: 0 }}
                  onClick={toggleDrawer(false)}
                >
                  <CloseIcon />
                </IconButton>
              )}
            </div>
          </StyledBox>

          <StyledBox
            sx={{
              px: 2,
              pb: 2,
              height: '100%',
              overflow: 'auto',
            }}
            onScroll={(event) => handleScroll(event)}
          >
            <div>{children}</div>
          </StyledBox>
        </SwipeableDrawer>
      </Root>
    </React.Fragment>
  )
}
