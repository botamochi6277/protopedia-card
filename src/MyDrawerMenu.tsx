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
  Pagination,
  Alert,
  Slider,
  Typography,
} from "@mui/material";
import { Theme, Breakpoint, CSSObject, styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
// icons
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HeightIcon from "@mui/icons-material/Height";
import ImageIcon from "@mui/icons-material/Image";
import LabelIcon from "@mui/icons-material/Label";
import PrintIcon from "@mui/icons-material/Print";
import UpdateIcon from "@mui/icons-material/Update";
import ArticleIcon from "@mui/icons-material/Article";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import InfoIcon from "@mui/icons-material/Info";

// internal
import DrawerHeader from "./DrawerHeader";
import MyForm from "./MyForm";

const ApiAlert = (props: { notification: NotificationItem }) => {
  if (200 <= props.notification.status && props.notification.status < 300) {
    return <Alert security="success">{props.notification.msg}</Alert>;
  }
  if (400 <= props.notification.status) {
    return <Alert security="warning">{props.notification.msg}</Alert>;
  }
};

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
  page_number: number;
  pageChangeHandle: (n: number) => void;
  fetchDataHandle: (data: any) => void;
  notification: NotificationItem;
  setNotification: (obj: NotificationItem) => void;
  container_width: Breakpoint;
  setContainerWidth: (bp: Breakpoint) => void;
  featured_img_visibility: boolean;
  featuredImgVisibilityHandle: (b: boolean) => void;
  view_counter_visibility: boolean;
  viewCounterVisibilityHandle: (b: boolean) => void;
  good_counter_visibility: boolean;
  goodCounterVisibilityHandle: (b: boolean) => void;
  imgs_visibility: boolean[];
  imgVisibilityHandle: (b: boolean[]) => void;
  imgRowHeight: number;
  setImgRowHeight: (n: number) => void;
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
        <ListItem>
          <ListItemIcon>
            <ArticleIcon />
          </ListItemIcon>
          <Pagination
            count={3}
            page={props.page_number}
            onChange={(_, v) => props.pageChangeHandle(v)}
            sx={{
              display: props.open ? "inherit" : "none",
            }}
          />
        </ListItem>
      </List>

      <Divider />

      <List>
        {props.notification.msg.length > 0 ? (
          <ListItem>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ApiAlert notification={props.notification} />
          </ListItem>
        ) : null}
        <ListItem key="fetch data item">
          <ListItemIcon>
            <UpdateIcon />
          </ListItemIcon>
          {props.open ? (
            <MyForm
              fetchDataHandle={props.fetchDataHandle}
              setNotification={props.setNotification}
            />
          ) : null}
        </ListItem>
      </List>

      <Divider />
      {/* Card width radio */}
      <List>
        <ListItem key="card width item">
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
        <ListItem key={"feature image switch"}>
          <ListItemIcon>
            <ImageIcon />
          </ListItemIcon>
          <FormControlLabel
            control={
              <Switch
                checked={props.featured_img_visibility}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  props.featuredImgVisibilityHandle(event.target.checked);
                }}
              />
            }
            label={`Featured image`}
          />
        </ListItem>
        <ListItem key={"View counter switch"}>
          <ListItemIcon>
            <VisibilityIcon />
          </ListItemIcon>
          <FormControlLabel
            control={
              <Switch
                checked={props.view_counter_visibility}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  props.viewCounterVisibilityHandle(event.target.checked);
                }}
              />
            }
            label={`View counter`}
          />
        </ListItem>
        <ListItem key={"Good counter switch"}>
          <ListItemIcon>
            <ThumbUpAltIcon />
          </ListItemIcon>
          <FormControlLabel
            control={
              <Switch
                checked={props.good_counter_visibility}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  props.goodCounterVisibilityHandle(event.target.checked);
                }}
              />
            }
            label={`Good counter`}
          />
        </ListItem>

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
                label={`Image-${i + 1}`}
              />
            </ListItem>
          );
        })}
        <ListItem key={"img row height"}>
          <ListItemIcon>
            <HeightIcon />
          </ListItemIcon>
          <Slider
            aria-label="Image Row Height"
            value={props.imgRowHeight}
            onChange={(_, v) => {
              props.setImgRowHeight(v as number);
            }}
            min={100}
            max={300}
            valueLabelDisplay="auto"
          />
        </ListItem>
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
