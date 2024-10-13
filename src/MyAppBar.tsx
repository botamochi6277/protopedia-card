import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

// icons
import PrintIcon from "@mui/icons-material/Print";
// custom

const MyAppBar = () => {
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
          <IconButton
            color="inherit"
            onClick={window.print}
            sx={{ displayPrint: "none" }}
          >
            <PrintIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {/* <MainStyle open={open} /> */}
    </Box>
  );
};

export default MyAppBar;
