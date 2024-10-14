import * as React from "react";
import { Breakpoint, Container, Box } from "@mui/material";

import PrototypeCard from "./PrototypeCard";
import DetailCard from "./DetailCard";
import MyDrawerMenu from "./MyDrawerMenu";
import theme from "./theme";
import Demo from "./Demo";
const App = () => {
  // params
  const [drawer_is_opened, setDrawerIsOpened] = React.useState(true);
  const [max_width, setMaxWidth] = React.useState<Breakpoint>("sm");

  const [page_number, setPageNumber] = React.useState(1);

  const [qrcode_visibility, setQRcodeVisibility] = React.useState(false); // default hide
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
    main_img: "",
    create_at: "2023-10-21T19:33:48+09:00",
    release_at: "2023-10-21T19:33:48+09:00",
    update_at: "2023-10-21T19:33:48+09:00",
    free_comment: "",
    system_description: "",
    system_image: "",
    good_count: 10,
    view_count: 50,
  });

  const [imgs_visibility, setImgsVisibility] = React.useState(
    prototype_data.images.map((img) => (img ? true : false))
  );

  React.useEffect(() => {
    setImgsVisibility(prototype_data.images.map((img) => (img ? true : false)));
  }, [prototype_data]);

  const parseProtoTypeRawData = (data: PrototypeRawData[]) => {
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
      main_img: data0.mainURL
        ? `https://protopedia.net/pic/${data0.mainURL}`
        : "",
      create_at: data0.createAt,
      release_at: data0.releaseAt,
      update_at: data0.updateAt,
      free_comment: data0.freeComment ?? "",
      system_description: data0.systemDescription ?? "",
      system_image: data0.systemImage ?? "",
      good_count: data0.goodCount,
      view_count: data0.viewCount,
    };
    setPrototypeData(proto);
  };

  const drawer_width = 400;

  return (
    <Box sx={{ display: "flex" }}>
      <MyDrawerMenu
        drawer_width={drawer_width}
        theme={theme}
        open={drawer_is_opened}
        openHandle={setDrawerIsOpened}
        page_number={page_number}
        pageChangeHandle={setPageNumber}
        fetchDataHandle={parseProtoTypeRawData}
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

      <Container maxWidth={max_width}>
        <Box component="main" sx={{ flexGrow: 1 }}>
          {page_number === 1 ? (
            <PrototypeCard
              prototype_data={prototype_data}
              imgs_visibility={imgs_visibility}
              qrcode_visibility={qrcode_visibility}
              photo_sign_visibility={photo_sign_visibility}
              no_photo_sign_visibility={no_photo_sign_visibility}
              dont_tough_sign_visibility={dont_tough_sign_visibility}
              footer_visibility={footer_visibility}
            />
          ) : null}
          {page_number === 2 ? (
            <DetailCard prototype_data={prototype_data} />
          ) : null}
        </Box>
      </Container>
    </Box>
  );
};

export default App;
