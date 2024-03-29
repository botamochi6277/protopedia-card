import * as React from 'react';

import { Button, FormControl, FormLabel, Radio, RadioGroup } from '@mui/material';
import AppBar from "@mui/material/AppBar";
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Breakpoint, styled, useTheme } from '@mui/material/styles';

import Drawer from '@mui/material/Drawer';

import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';

// icons
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DoNotTouchIcon from '@mui/icons-material/DoNotTouch';
import HeightIcon from '@mui/icons-material/Height';
import ImageIcon from '@mui/icons-material/Image';
import LabelIcon from '@mui/icons-material/Label';
import MenuIcon from '@mui/icons-material/Menu';
import NoPhotographyIcon from '@mui/icons-material/NoPhotography';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import PrintIcon from '@mui/icons-material/Print';
import QrCodeIcon from '@mui/icons-material/QrCode';
import UpdateIcon from '@mui/icons-material/Update';
// custom

import MyForm from './MyForm';

type MyFormProps = {
  fetchDataHandle: (data: any) => void,
  container_width: Breakpoint,
  setContainerWidth: (bp: Breakpoint) => void,
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
  footer_visibility: boolean,
  footerVisibilityHandle: (b: boolean) => void,
};


const drawerWidth = 480;

const MainStyle = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
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
            sx={{ mr: 2, displayPrint: 'none', ...(open && { display: 'none' }) }}
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

          <Typography sx={{ flexGrow: 1 }}>
          </Typography>
          <IconButton
            color="inherit"
            onClick={window.print}
            sx={{ displayPrint: 'none' }}
          >
            <PrintIcon />
          </IconButton>
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
          <Button
            onClick={handleDrawerClose}
            startIcon={theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          >Close Config</Button>
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
        {/* Card width radio */}
        <List>
          <ListItem key="fetch data item">
            <ListItemIcon>
              <HeightIcon sx={{ transform: "rotate(90deg)" }} />
            </ListItemIcon>
            <FormControl>
              <FormLabel>Card width</FormLabel>
              <RadioGroup
                row
                value={props.container_width}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  props.setContainerWidth(event.target.value as Breakpoint)
                }}
              >
                <FormControlLabel value={"xs"} control={<Radio />} label="xs" />
                <FormControlLabel value={"sm"} control={<Radio />} label="sm" />
                <FormControlLabel value={"md"} control={<Radio />} label="md" />
              </RadioGroup>
            </FormControl>
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
        <Divider />
        <List>
          <ListItem key="fetch data item">
            <ListItemIcon>
              <LabelIcon />
            </ListItemIcon>
            <FormControlLabel
              control={
                <Switch
                  checked={props.footer_visibility}
                  onChange={() => props.footerVisibilityHandle(!props.footer_visibility)}
                />}
              label={"footer"} />
          </ListItem>
        </List>

      </Drawer>
      <MainStyle open={open} />
    </Box>
  );
}

export default MyAppBar;
