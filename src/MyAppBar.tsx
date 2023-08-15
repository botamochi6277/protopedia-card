import * as React from 'react'

import { styled, useTheme } from '@mui/material/styles';

import CssBaseline from '@mui/material/CssBaseline';
import AppBar from "@mui/material/AppBar";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';

import Drawer from '@mui/material/Drawer';

import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';

// icons
import MenuIcon from '@mui/icons-material/Menu';
import UpdateIcon from '@mui/icons-material/Update';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import QrCodeIcon from '@mui/icons-material/QrCode';

// custom
import MyForm from './MyForm'

type MyFormProps = {
  fetchDataHandle: (data: any) => void,
  qrcodeHandle: (b: boolean) => void
};


const drawerWidth = 480;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const MyAppBar = (props: MyFormProps) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);// default open

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [qrcode_checked, setQrcodeChecked] = React.useState(true);

  const qrcodeSwitchHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQrcodeChecked(event.target.checked);
    props.qrcodeHandle(event.target.checked);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* <AppBar position="static" open={open}> */}
      <AppBar position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap component="div"
            sx={{
              mr: 2,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}>ProtoPedia Card</Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          Config
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <List>
          <ListItem key="fetch data item">
            <ListItemIcon>
              <UpdateIcon />
            </ListItemIcon>
            <MyForm fetchDataHandle={props.fetchDataHandle} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <QrCodeIcon />
            </ListItemIcon>
            <FormControlLabel control={<Switch checked={qrcode_checked} onChange={qrcodeSwitchHandleChange} />} label="QR Code" />
          </ListItem>
        </List>
        <Divider />
        <List>
        </List>
      </Drawer>
      <Main open={open}>
      </Main>
    </Box>
  );
}

export default MyAppBar;
