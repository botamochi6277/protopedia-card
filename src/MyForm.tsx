import * as React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

// dialog
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// icons
import CloseIcon from "@mui/icons-material/Close";
import HelpIcon from "@mui/icons-material/Help";
import UpdateIcon from "@mui/icons-material/Update";

import axios from "axios";

type MyFormProps = {
  setPrototypeData: (data: any) => void;
  setNotification: (obj: NotificationItem) => void;
};

function MyForm(props: MyFormProps) {
  const [access_token, setAccessToken] = React.useState(
    localStorage.getItem("api_token") ?? ""
  );

  React.useEffect(() => {
    localStorage.setItem("api_token", access_token);
  }, [access_token]);

  const [token_error, setTokenError] = React.useState(false);
  const [token_help, setTokenHelp] = React.useState("");

  const [prototype_id, setProtoTypeId] = React.useState("4203");
  const [prototype_id_error, setPrototypeIdError] = React.useState(false);
  const [prototype_id_help, setPrototypeIdHelp] = React.useState("");

  const setPrototypeData = props.setPrototypeData;

  const fetchProjectData = (token: string, prototype_id: string) => {
    // input validation
    const token_ref = token.match(/[a-f0-9]{32}/g);
    if (!token_ref) {
      setTokenError(true);
      setTokenHelp("token must be 32 letters");
      return;
    } else {
      setTokenError(false);
      setTokenHelp("");
    }

    const id_ref = Number(prototype_id);
    if (!id_ref) {
      // id have non-number value
      setPrototypeIdError(true);
      setPrototypeIdHelp("ID must be numbers");
      return;
    } else {
      setPrototypeIdError(false);
      setPrototypeIdHelp("");
    }

    const url = `https://protopedia.net/api/prototypes.json?token=${token}&prototypeId=${prototype_id}`;
    console.debug(`sending requesting to ${url}`);
    axios
      .get(url)
      .then((res) => {
        console.debug("raw response: ");
        console.debug(res);
        // NOTE
        // protopedia APIの変な挙動
        // 登録されているmaterialの数だけprototype_raw dataが返ってくる...ことがある
        // なんで materialsとかでまとめて返さないのだろうか？？

        if (res.status >= 400) {
          props.setNotification({
            status: res.status,
            msg: `Fail to fetch prototype-${prototype_id}`,
          });
        }

        setPrototypeData(res.data);
        if (res.data.length == 0) {
          props.setNotification({
            status: res.status,
            msg: `No prototype-${prototype_id} in ProtoPedia-API`,
          });
        } else {
          props.setNotification({
            status: res.status,
            msg: `success to fetch prototype-${prototype_id}`,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        props.setNotification({ status: 0, msg: `${error}` });
      });
  };

  const [is_dialog_open, setDialogOpen] = React.useState(false);

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const HelpDialog = () => {
    return (
      <Dialog open={is_dialog_open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">
          {"API Access Token & Prototype ID"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description1">
            The access token is necessary to fetch data from ProtoPedia API. You
            can get it from{" "}
            <Link
              href="https://protopedia.net/settings/application"
              target="_blank"
            >
              the personal setting page
            </Link>
            .
          </DialogContentText>
          <DialogContentText id="alert-dialog-description2">
            You can get prototype id from a prototype page's url:
            <Typography sx={{ fontFamily: "monospace" }}>
              {"https://protopedia.net/prototype/${prototype_id}"}
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={handleClose}
            startIcon={<CloseIcon />}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <Box sx={{ displayPrint: "none" }}>
      <HelpDialog />
      <Stack
        direction={{ xs: "column" }}
        spacing={{ xs: 1 }}
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
            setAccessToken(event.target.value);
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
            setProtoTypeId(event.target.value);
          }}
        />
        <Stack direction={"row"}>
          <Button
            variant="contained"
            startIcon={<UpdateIcon />}
            onClick={() => {
              fetchProjectData(access_token, prototype_id);
            }}
          >
            Fetch Data
          </Button>
          <IconButton aria-label="help" onClick={handleClickOpen}>
            <HelpIcon />
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
}

export default MyForm;
