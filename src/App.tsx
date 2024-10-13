import * as React from "react";
import { Breakpoint, Container, Box } from "@mui/material";

import PrototypeCard from "./PrototypeCard";
import MyDrawerMenu from "./MyDrawerMenu";
import theme from "./theme";

const App = () => {
  // params
  const [drawer_is_opened, setDrawerIsOpened] = React.useState(true);
  const [max_width, setMaxWidth] = React.useState<Breakpoint>("sm");

  const [qrcode_visibility, setQRcodeVisibility] = React.useState(true); // default show
  const [photo_sign_visibility, setPhotoSignVisibility] = React.useState(false);
  const [no_photo_sign_visibility, setNoPhotoSignVisibility] =
    React.useState(false);
  const [dont_tough_sign_visibility, setDontTouchSignVisibility] =
    React.useState(false);

  const [footer_visibility, setFooterVisibility] = React.useState(true);

  const [prototype_data, setPrototypeData] = React.useState({
    name: "ｽﾀﾝﾃﾞｨﾝｸﾞ ｽﾀｯｸﾁｬﾝ",
    developing_status: 3,
    images: [
      "https://protopedia.net/pic/d20b6eb0-de41-494e-b54a-983691e9957b.png",
    ],
    summary:
      "飛べる！踊れる！ｽﾀｯｸﾁｬﾝ!! なｽﾀｯｸﾁｬﾝのフィギュアです. The action figure of stackchan can pose flying, dancing, etc.",
    developer: "botamochi6277",
    team: "BotaLab",
    materials: ["M5Stack Core 2"],
    tags: ["3D Printer", "action figure"],
    prototype_id: 4203,
  });

  const [imgs_visibility, setImgsVisibility] = React.useState(
    prototype_data.images.map((img) => (img ? true : false))
  );

  React.useEffect(() => {
    setImgsVisibility(prototype_data.images.map((img) => (img ? true : false)));
  }, [prototype_data]);

  const handleStateChange = (data: PrototypeRawData[]) => {
    if (data.length == 0) {
      return;
    }
    const data0 = data[0];
    const images_ref = [
      data0.image1,
      data0.image2,
      data0.image3,
      data0.image4,
      data0.image5,
    ];
    // material list with removing overlap values
    const mat = data
      .map((d) => d.materialNm)
      .filter((elem, index, self) => self.indexOf(elem) === index);
    const images = images_ref.filter((im) => im); // remove null
    const proto: PrototypeData = {
      name: data0.prototypeNm ?? "Awesome Prototype",
      developing_status: data0.status ?? 0,
      images: images,
      summary: data0.summary ?? "",
      developer: data0.userNm ?? "HIRAGA Gennai",
      team: data0.teamNm ?? "",
      materials: mat ?? [],
      tags: data0.tags ? data0.tags.split("|") : [],
      prototype_id: data0.id,
    };
    setPrototypeData(proto);
  };

  const drawer_width = 400;

  return (
    <Container maxWidth={max_width} sx={{ display: "flex" }}>
      <MyDrawerMenu
        drawer_width={drawer_width}
        theme={theme}
        open={drawer_is_opened}
        openHandle={setDrawerIsOpened}
        fetchDataHandle={handleStateChange}
        container_width={max_width}
        setContainerWidth={setMaxWidth}
        imgs_visibility={imgs_visibility}
        imgVisibilityHandle={(v: boolean[]) => {
          setImgsVisibility(v);
        }}
        qrcode_visibility={qrcode_visibility}
        qrcodeHandle={(v: boolean) => {
          setQRcodeVisibility(v);
        }}
        photo_sign_visibility={photo_sign_visibility}
        photoSignHandle={(v: boolean) => {
          setPhotoSignVisibility(v);
        }}
        no_photo_sign_visibility={no_photo_sign_visibility}
        noPhotoSignHandle={(v: boolean) => {
          setNoPhotoSignVisibility(v);
        }}
        dont_touch_visibility={dont_tough_sign_visibility}
        dontTouchHandle={(v: boolean) => {
          setDontTouchSignVisibility(v);
        }}
        footer_visibility={footer_visibility}
        footerVisibilityHandle={(v: boolean) => setFooterVisibility(v)}
      />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <PrototypeCard
          prototypeData={prototype_data}
          container_width={max_width}
          imgs_visibility={imgs_visibility}
          qrcode_visibility={qrcode_visibility}
          photo_sign_visibility={photo_sign_visibility}
          no_photo_sign_visibility={no_photo_sign_visibility}
          dont_tough_sign_visibility={dont_tough_sign_visibility}
          footer_visibility={footer_visibility}
        />
      </Box>
    </Container>
  );
};

export default App;
