import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";

// custom

const MyAppBar = (props: { prototype_id?: number }) => {
  const qr_code_url = `https://api.qrserver.com/v1/create-qr-code/?data=https://protopedia.net/prototype/${props.prototype_id}&size=128x128&format=svg&color=1e1e1e&qzone=2`;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              mr: 2,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            ProtoPedia Card
          </Typography>

          <Typography sx={{ flexGrow: 1 }}></Typography>
          {props.prototype_id ? (
            <IconButton sx={{ p: 0 }}>
              <Avatar alt="QR code" src={qr_code_url} variant="rounded" />
            </IconButton>
          ) : null}
        </Toolbar>
      </AppBar>
      {/* <MainStyle open={open} /> */}
    </Box>
  );
};

export default MyAppBar;
