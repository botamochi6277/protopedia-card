import * as React from 'react'

import axios from 'axios';

import { styled, useTheme } from '@mui/material/styles';

import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import AppBar from "@mui/material/AppBar";
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Menu from '@mui/material/Menu';

import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';


import Drawer from '@mui/material/Drawer';

import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// icons
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import UpdateIcon from '@mui/icons-material/Update';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

// custom
import MyForm from './MyForm'

type MyFormProps = {
  fetchDataHandle: (data: any) => void,
};

function FetchDataForm(props: MyFormProps) {
  const [access_token, setAccessToken] = React.useState('');
  const [token_error, setTokenError] = React.useState(false);
  const [token_help, setTokenHelp] = React.useState('');

  const [prototype_id, setProtoTypeId] = React.useState('2385');
  const [prototype_id_error, setPrototypeIdError] = React.useState(false);
  const [prototype_id_help, setPrototypeIdHelp] = React.useState('');

  const fetchHandle = props.fetchHandle;

  const fetchProjectData = (token: string, prototype_id: string) => {
    // input validation
    const token_ref = token.match(/[a-f0-9]{32}/g);
    if (!token_ref) {
      setTokenError(true);
      setTokenHelp('token must be 32 letters')
      return;
    } else {
      setTokenError(false);
      setTokenHelp('');
    }

    const id_ref = Number(prototype_id);
    if (!id_ref) {
      // id have non-number value
      setPrototypeIdError(true);
      setPrototypeIdHelp('ID must be numbers')
      return;
    } else {
      setPrototypeIdError(false);
      setPrototypeIdHelp('');
    }

    const url = `https://protopedia.net/api/prototypes.json?token=${token}&prototypeId=${prototype_id}`
    axios.get(url).then((res) => {
      console.debug(res);
      fetchHandle(res.data[0]);
    }).catch((error) => {
      console.log(error);
    })
  }

  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={{ xs: 1, sm: 2, md: 4 }}
      alignItems="center"
    >
      <TextField
        required
        id="access-token"
        label="access token"
        value={access_token}
        error={token_error}
        helperText={token_help}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setAccessToken(event.target.value)
        }}
      />

      <TextField
        required
        id="prototype-id"
        label="prototype id"
        value={prototype_id}
        error={prototype_id_error}
        helperText={prototype_id_help}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setProtoTypeId(event.target.value)
        }}
      />

      <Button
        variant="contained"
        startIcon={<UpdateIcon />}
        onClick={() => { fetchProjectData(access_token, prototype_id) }}>
        Fetch
      </Button>

    </Stack>
  );

}




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

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== 'open',
// })<AppBarProps>(({ theme, open }) => ({
//   transition: theme.transitions.create(['margin', 'width'], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     width: `calc(100% - ${drawerWidth}px)`,
//     marginLeft: `${drawerWidth}px`,
//     transition: theme.transitions.create(['margin', 'width'], {
//       easing: theme.transitions.easing.easeOut,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

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
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <List>
          <ListItem key="fetch data item" disablePadding>

            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <MyForm fetchDataHandle={props.fetchDataHandle} />

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
