import * as React from 'react'
import { Global } from '@emotion/react'
import { styled } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { grey } from '@mui/material/colors'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'

const drawerBleeding = 56

const Root = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor:
    theme.palette.mode === 'light'
      ? grey[100]
      : theme.palette.background.default,
}))

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#ffffffe6' : grey[800],
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

export default function SwipeableEdgeDrawer() {
  const [open, setOpen] = React.useState(false)

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen)
  }

  const containerRef = React.useRef(null)
  const container = containerRef.current

  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(50% - ${drawerBleeding}px)`,
            overflow: 'visible',
            width: '31.1%',
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
      >
        <Button onClick={toggleDrawer(true)}>Open</Button>
      </Box>
      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={open}
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
          <Puller />
          <Typography sx={{ p: 2, color: 'text.secondary' }}>
            0 result(s)
          </Typography>
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: '100%',
            overflow: 'auto',
          }}
        >
          <Typography sx={{ p: 2, color: 'text.secondary' }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque
            adipisci rem quo distinctio similique suscipit expedita est quam
            culpa voluptatibus voluptatum aliquam dicta id molestiae, vero
            aperiam veritatis maiores ad. Lorem ipsum, dolor sit amet
            consectetur adipisicing elit. Nam ipsum quo atque, libero nisi
            commodi et quam adipisci reprehenderit necessitatibus ut itaque
            voluptatem amet inventore assumenda expedita mollitia iure quos?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque
            adipisci rem quo distinctio similique suscipit expedita est quam
            culpa voluptatibus voluptatum aliquam dicta id molestiae, vero
            aperiam veritatis maiores ad. Lorem ipsum, dolor sit amet
            consectetur adipisicing elit. Nam ipsum quo atque, libero nisi
            commodi et quam adipisci reprehenderit necessitatibus ut itaque
            voluptatem amet inventore assumenda expedita mollitia iure quos?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque
            adipisci rem quo distinctio similique suscipit expedita est quam
            culpa voluptatibus voluptatum aliquam dicta id molestiae, vero
            aperiam veritatis maiores ad. Lorem ipsum, dolor sit amet
            consectetur adipisicing elit. Nam ipsum quo atque, libero nisi
            commodi et quam adipisci reprehenderit necessitatibus ut itaque
            voluptatem amet inventore assumenda expedita mollitia iure quos?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque
            adipisci rem quo distinctio similique suscipit expedita est quam
            culpa voluptatibus voluptatum aliquam dicta id molestiae, vero
            aperiam veritatis maiores ad. Lorem ipsum, dolor sit amet
            consectetur adipisicing elit. Nam ipsum quo atque, libero nisi
            commodi et quam adipisci reprehenderit necessitatibus ut itaque
            voluptatem amet inventore assumenda expedita mollitia iure quos?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque
            adipisci rem quo distinctio similique suscipit expedita est quam
            culpa voluptatibus voluptatum aliquam dicta id molestiae, vero
            aperiam veritatis maiores ad. Lorem ipsum, dolor sit amet
            consectetur adipisicing elit. Nam ipsum quo atque, libero nisi
            commodi et quam adipisci reprehenderit necessitatibus ut itaque
            voluptatem amet inventore assumenda expedita mollitia iure quos?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque
            adipisci rem quo distinctio similique suscipit expedita est quam
            culpa voluptatibus voluptatum aliquam dicta id molestiae, vero
            aperiam veritatis maiores ad. Lorem ipsum, dolor sit amet
            consectetur adipisicing elit. Nam ipsum quo atque, libero nisi
            commodi et quam adipisci reprehenderit necessitatibus ut itaque
            voluptatem amet inventore assumenda expedita mollitia iure quos?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque
            adipisci rem quo distinctio similique suscipit expedita est quam
            culpa voluptatibus voluptatum aliquam dicta id molestiae, vero
            aperiam veritatis maiores ad. Lorem ipsum, dolor sit amet
            consectetur adipisicing elit. Nam ipsum quo atque, libero nisi
            commodi et quam adipisci reprehenderit necessitatibus ut itaque
            voluptatem amet inventore assumenda expedita mollitia iure quos?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque
            adipisci rem quo distinctio similique suscipit expedita est quam
            culpa voluptatibus voluptatum aliquam dicta id molestiae, vero
            aperiam veritatis maiores ad. Lorem ipsum, dolor sit amet
            consectetur adipisicing elit. Nam ipsum quo atque, libero nisi
            commodi et quam adipisci reprehenderit necessitatibus ut itaque
            voluptatem amet inventore assumenda expedita mollitia iure quos?
          </Typography>
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  )
}
