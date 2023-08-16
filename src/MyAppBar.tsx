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
import ImageIcon from '@mui/icons-material/Image';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import NoPhotographyIcon from '@mui/icons-material/NoPhotography';
import DoNotTouchIcon from '@mui/icons-material/DoNotTouch';

// custom
import MyForm from './MyForm'

type MyFormProps = {
  fetchDataHandle: (data: any) => void,
  imgs_visibility: boolean[]
  imgVisibilityHandle: (b: boolean[]) => void,
  qrcode_visibility: boolean,
  qrcodeHandle: (b: boolean) => void,
  photo_sign_visibility: boolean,
  photoSignHandle: (b: boolean) => void,
  no_photo_sign_visibility: boolean,
  noPhotoSignHandle: (b: boolean) => void,
  dont_touch_visibility: boolean,
  dontTouchHandle: (b: boolean) => void,
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

  const handleImgChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    let new_array = props.imgs_visibility.concat();
    new_array[index] = event.target.checked;
    props.imgVisibilityHandle(new_array);
  };

  const sign_items = [
    {
      name: "qrcode",
      icon: <QrCodeIcon />,
      checked: props.qrcode_visibility,
      on_change: (event: React.ChangeEvent<HTMLInputElement>) => { props.qrcodeHandle(event.target.checked); }
    },
    {
      name: "camera",
      icon: <PhotoCameraIcon />,
      checked: props.photo_sign_visibility,
      on_change: (event: React.ChangeEvent<HTMLInputElement>) => { props.photoSignHandle(event.target.checked); }
    },
    {
      name: "no photography",
      icon: <NoPhotographyIcon />,
      checked: props.no_photo_sign_visibility,
      on_change: (event: React.ChangeEvent<HTMLInputElement>) => { props.noPhotoSignHandle(event.target.checked); }
    },
    {
      name: "do not touch",
      icon: <DoNotTouchIcon />,
      checked: props.dont_touch_visibility,
      on_change: (event: React.ChangeEvent<HTMLInputElement>) => { props.dontTouchHandle(event.target.checked); }
    }
  ]

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
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
        </List>
        <Divider />
        <List>
          {
            props.imgs_visibility.map((img, i) => {
              return (
                <ListItem key={`img-${img}-${i}`}>
                  <ListItemIcon>
                    <ImageIcon />
                  </ListItemIcon>
                  <FormControlLabel
                    control={<Switch
                      checked={props.imgs_visibility[i]}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        handleImgChange(event, i);
                      }}
                    />}

                    label={(i == 0) ? "Featured image" : `Image-${i}`} />
                </ListItem>)
            })
          }

          {sign_items.map(
            (item) => {
              return (
                <ListItem key={item.name}>
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  <FormControlLabel
                    control={<Switch checked={item.checked} onChange={item.on_change} />} label={item.name} />
                </ListItem>
              )
            }
          )}
        </List>
      </Drawer>
      <Main open={open}>
      </Main>
    </Box>
  );
}

export default MyAppBar;
