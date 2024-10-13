import {
  Button,
  IconButton,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { Theme, Breakpoint, CSSObject, styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
// icons
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DoNotTouchIcon from "@mui/icons-material/DoNotTouch";
import HeightIcon from "@mui/icons-material/Height";
import ImageIcon from "@mui/icons-material/Image";
import LabelIcon from "@mui/icons-material/Label";
import NoPhotographyIcon from "@mui/icons-material/NoPhotography";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import PrintIcon from "@mui/icons-material/Print";
import QrCodeIcon from "@mui/icons-material/QrCode";
import UpdateIcon from "@mui/icons-material/Update";

// internal
import DrawerHeader from "./DrawerHeader";
import MyForm from "./MyForm";

const drawerWidth = 400;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

type MyDrawerMenuProps = {
  drawer_width: number;
  theme: Theme;
  open: boolean;
  openHandle: (b: boolean) => void;
  fetchDataHandle: (data: any) => void;
  container_width: Breakpoint;
  setContainerWidth: (bp: Breakpoint) => void;
  imgs_visibility: boolean[];
  imgVisibilityHandle: (b: boolean[]) => void;
  qrcode_visibility: boolean;
  qrcodeHandle: (b: boolean) => void;
  photo_sign_visibility: boolean;
  photoSignHandle: (b: boolean) => void;
  no_photo_sign_visibility: boolean;
  noPhotoSignHandle: (b: boolean) => void;
  dont_touch_visibility: boolean;
  dontTouchHandle: (b: boolean) => void;
  footer_visibility: boolean;
  footerVisibilityHandle: (b: boolean) => void;
};

type OpenObj = {
  open: boolean;
};

const Drawer = styled(
  MuiDrawer, // component
  {
    shouldForwardProp: (prop) => prop !== "open",
  } // [options]
)(
  ({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    variants: [
      {
        props: (obj: OpenObj) => obj.open,
        style: {
          ...openedMixin(theme),
          "& .MuiDrawer-paper": openedMixin(theme),
        },
      },
      {
        props: (obj: OpenObj) => !obj.open,
        style: {
          ...closedMixin(theme),
          "& .MuiDrawer-paper": closedMixin(theme),
        },
      },
    ],
  }) //styles
);

const MyDrawerMenu = (props: MyDrawerMenuProps) => {
  const handleImgChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    let new_array = props.imgs_visibility.concat();
    new_array[index] = event.target.checked;
    props.imgVisibilityHandle(new_array);
  };

  const sign_items = [
    {
      name: "qrcode",
      icon: <QrCodeIcon />,
      checked: props.qrcode_visibility,
      on_change: (event: React.ChangeEvent<HTMLInputElement>) => {
        props.qrcodeHandle(event.target.checked);
      },
    },
    {
      name: "camera",
      icon: <PhotoCameraIcon />,
      checked: props.photo_sign_visibility,
      on_change: (event: React.ChangeEvent<HTMLInputElement>) => {
        props.photoSignHandle(event.target.checked);
      },
    },
    {
      name: "no photography",
      icon: <NoPhotographyIcon />,
      checked: props.no_photo_sign_visibility,
      on_change: (event: React.ChangeEvent<HTMLInputElement>) => {
        props.noPhotoSignHandle(event.target.checked);
      },
    },
    {
      name: "do not touch",
      icon: <DoNotTouchIcon />,
      checked: props.dont_touch_visibility,
      on_change: (event: React.ChangeEvent<HTMLInputElement>) => {
        props.dontTouchHandle(event.target.checked);
      },
    },
  ];

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      open={props.open}
      sx={{ displayPrint: "none" }}
    >
      <DrawerHeader
        sx={{
          display: props.open ? "inherit" : "none",
        }}
      >
        {props.open ? (
          <Button
            onClick={() => {
              props.openHandle(false);
            }}
            startIcon={
              props.theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )
            }
          >
            Fold
          </Button>
        ) : null}
      </DrawerHeader>

      {/* List of actions */}
      <List>
        <ListItem
          key={"open menu"}
          sx={{
            display: props.open ? "none" : "inherit",
          }}
        >
          <IconButton
            onClick={() => {
              props.openHandle(true);
            }}
            sx={{ padding: 0 }}
            color="primary"
          >
            <ChevronRightIcon />
          </IconButton>
        </ListItem>
        <ListItem key={"print"}>
          <ListItemIcon>
            <IconButton
              color="primary"
              onClick={window.print}
              sx={{ padding: 0 }}
            >
              <PrintIcon onClick={window.print} />
            </IconButton>
          </ListItemIcon>
          <Button
            startIcon={<PrintIcon />}
            onClick={window.print}
            variant="contained"
          >
            Print
          </Button>
        </ListItem>
      </List>

      <Divider />

      <List>
        <ListItem key="fetch data item">
          <ListItemIcon>
            <UpdateIcon />
          </ListItemIcon>
          {props.open ? (
            <MyForm fetchDataHandle={props.fetchDataHandle} />
          ) : null}
        </ListItem>
      </List>

      <Divider />
      {/* Card width radio */}
      <List>
        <ListItem key="fetch data item">
          <ListItemIcon>
            <HeightIcon sx={{ transform: "rotate(90deg)" }} />
          </ListItemIcon>

          <FormControl
            sx={{
              display: props.open ? "inherit" : "none",
            }}
          >
            <FormLabel>Card width</FormLabel>
            <RadioGroup
              row
              value={props.container_width}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                props.setContainerWidth(event.target.value as Breakpoint);
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
        {props.imgs_visibility.map((img, i) => {
          return (
            <ListItem key={`img-${img}-${i}`}>
              <ListItemIcon>
                <ImageIcon />
              </ListItemIcon>
              <FormControlLabel
                control={
                  <Switch
                    checked={props.imgs_visibility[i]}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      handleImgChange(event, i);
                    }}
                  />
                }
                label={i == 0 ? "Featured image" : `Image-${i}`}
              />
            </ListItem>
          );
        })}

        {sign_items.map((item) => {
          return (
            <ListItem key={item.name}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <FormControlLabel
                control={
                  <Switch checked={item.checked} onChange={item.on_change} />
                }
                label={item.name}
              />
            </ListItem>
          );
        })}
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
                onChange={() =>
                  props.footerVisibilityHandle(!props.footer_visibility)
                }
              />
            }
            label={"footer"}
          />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default MyDrawerMenu;
